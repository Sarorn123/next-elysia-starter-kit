import { getUser } from "@/auth/lucia";
import { redirect } from "@/lib/navigation";
import Image from "next/image";
import React, { PropsWithChildren } from "react";

const AuthLayout = async ({ children }: PropsWithChildren) => {
  const session = await getUser();
  if (session) redirect("/dashboard");

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      {children}
      <div className="hidden bg-muted lg:block">
        <Image
          src="/vercel.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
