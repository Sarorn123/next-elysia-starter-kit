"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { Link, redirect, useRouter } from "@/lib/navigation";
import { HTTP_CODE } from "@/lib/http-status-code";
import { useResponseMessage } from "@/hook/helper";
import { onRegister } from "../../../../action/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { LoginSchema, SignupSchema, signUpSchema } from "@/schema-type/auth";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignupPage() {
  const message = useResponseMessage();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SignupSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  async function submit(data: LoginSchema) {
    setLoading(true);
    const response = await onRegister({
      email: data.email,
      password: data.password,
    });
    if (response.status === HTTP_CODE.OK) {
      toast.success(message(response.message));
      router.push("/auth/otp?email=" + data.email);
    } else toast.error(message(response.message));
    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center py-12">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submit)}
          className="space-y-6mx-auto grid w-[350px] gap-6"
        >
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-balance text-muted-foreground">
              sign up an account for start 👌
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
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Re type the password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              Sign Up
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            already have an account?{" "}
            <Link href="/auth/login" className="underline">
              login
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
