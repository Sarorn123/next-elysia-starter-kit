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
import { onRegister } from "../action";

export default function SignupPage() {
  const message = useResponseMessage();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(""); // noted: you can use zod to validate form data this is just example
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  async function doLogin() {
    if (password !== confirmPassword) {
      toast.error("Password did not match");
      return;
    }

    setLoading(true);
    const response = await onRegister({ username, password });
    if (response.status === HTTP_CODE.OK) {
      toast.success(message(response.message));
      router.push("/auth/login");
    } else toast.error(message(response.message));
    setLoading(false);
  }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-balance text-muted-foreground">
              sign up an account for start 👌
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id=""
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              onClick={doLogin}
            >
              Sign Up
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            already have an account?{" "}
            <Link href="/auth/login" className="underline">
              login
            </Link>
          </div>
        </div>
      </div>
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
}
