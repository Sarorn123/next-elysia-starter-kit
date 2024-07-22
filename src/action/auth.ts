"use server";

import { LoginSchema, OTPSchema } from "@/schema-type/auth";
import { HTTP_CODE } from "@/lib/http-status-code";
import { redirect } from "@/lib/navigation";
import { cookies } from "next/headers";
import { lucia } from "@/auth/lucia";
import { ElysiaErrorType } from "@/types";
import { getToken, ssrClient } from "@/lib";

export const onLogin = async (body: LoginSchema) => {
  const { data, error, status } = await ssrClient.api.login.post(body);
  if (data) {
    cookies().set(lucia.sessionCookieName, data?.sessionId as string)
    return {
      message: data.message,
      status
    }
  }
  const err = error as ElysiaErrorType
  return {
    message: err.value.message,
    status
  }

};

export async function onLogout() {
  const { data, error, status } = await ssrClient.api.logout.get({
    headers: {
      authorization: getToken()
    }
  })
  if (status === HTTP_CODE.OK || status === HTTP_CODE.UNAUTHORIZED) {
    cookies().delete(lucia.sessionCookieName);
    redirect("/auth/login");
  }
}

export async function onRegister(body: LoginSchema) {
  const { data, error, status } = await ssrClient.api.register.post(body)
  if (data) {
    return {
      message: data?.message,
      status
    }
  }
  const err = error as ElysiaErrorType
  return {
    message: err.value.message,
    status
  }
}

export async function otpAction(body: OTPSchema) {
  const { data, error, status } = await ssrClient.api["verify-otp"].post(body)
  if (data) {
    return {
      message: data?.message,
      status
    }
  }
  const err = error as ElysiaErrorType
  return {
    message: err.value.message,
    status
  }
}