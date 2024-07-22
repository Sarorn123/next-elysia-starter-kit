"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { onLogin } from "../../../../action/auth";
import { useState } from "react";
import { toast } from "sonner";
import { Link, useRouter } from "@/lib/navigation";
import { HTTP_CODE } from "@/lib/http-status-code";
import { useResponseMessage } from "@/hook/helper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginSchema, loginSchema } from "@/schema-type/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Login() {
  const message = useResponseMessage();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function doLogin(data: LoginSchema) {
    setLoading(true);
    const response = await onLogin(data);
    if (response.status === HTTP_CODE.OK) {
      toast.success(message(response.message));
    } else if (response.status === HTTP_CODE.FORBIDDEN) {
      router.push("/auth/otp?email=" + data.email);
    } else toast.error(message(response.message));
    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center py-12">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(doLogin)}
          className="space-y-6mx-auto grid w-[350px] gap-6"
        >
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Login with your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="A really complex password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            don not have an account ?{" "}
            <Link href="/auth/signup" className="underline">
              Sign Up
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
