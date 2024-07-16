"use server";

import { getToken, ssrClient } from "@/lib";
import { action, handleResponse } from "@/lib/safe-action";
import { uploadFile } from "@/lib/upload";
import {
  createUserSchema,
  CreateUserSchema,
  UserQueryParams,
  UserSchemaParams,
  userSchemaParams,
} from "@/schema-type/user";
import { ElysiaErrorType } from "@/types";
import { revalidatePath } from "next/cache";

export const createUserAction = action(
  createUserSchema,
  async (body: CreateUserSchema) => {
    let url: string | undefined = body.photo as string;
    if (body.photo instanceof File) {
      url = await uploadFile(body.photo as File);
    }
    const { data, error } = await ssrClient.api.user
      .post({ ...body, photo: url })
      .catch((err) => {
        throw new Error(err);
      });
    if (error) {
      const err = error as ElysiaErrorType;
      return { error: err.value.message };
    }
    revalidatePath("/dashboard/user");
    return { success: data.message };
  }
);

export const listUserAction = async (query: UserQueryParams) => {
  const { data, error } = await ssrClient.api.user
    .get({
      query,
    })
    .catch((err) => {
      throw new Error(err);
    });
  if (error) {
    const err = error as ElysiaErrorType;
    return { error: err.value.message };
  }
  return { data };
};

export const deleteUserAction = action(
  userSchemaParams,
  async (body: UserSchemaParams) => {
    const { data, error } = await ssrClient.api.user
      .delete(body)
      .catch((err) => {
        throw new Error(err);
      });
    return handleResponse({
      data,
      error,
      validatePath: "/dashboard/user",
    });
  }
);

export const getSingleUser = async (id: string) => {
  const { data, error } = await ssrClient.api.user.single
    .get({ query: { id } })
    .catch((err) => {
      throw new Error(err);
    });

  return data;
};
