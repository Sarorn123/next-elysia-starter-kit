import { getUser } from "@/auth/lucia";
import { redirect } from "@/lib/navigation";
import React, { PropsWithChildren } from "react";

const AuthLayout = async ({ children }: PropsWithChildren) => {
  const session = await getUser();
  if (session) redirect("/dashboard");
  return <>{children}</>;
};

export default AuthLayout;
