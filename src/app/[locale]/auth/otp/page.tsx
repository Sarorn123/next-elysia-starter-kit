"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { otpSchema, OTPSchema } from "@/schema-type/auth";
import { otpAction } from "@/action/auth";
import { useSearchParams } from "next/navigation";
import { HTTP_CODE } from "@/lib/http-status-code";
import { toast } from "sonner";
import { useResponseMessage } from "@/hook/helper";
import { useRouter } from "@/lib/navigation";
import { useState } from "react";

export default function InputOTPForm() {
  const [isConfirming, setIsConfirming] = useState<boolean>(false);

  const q = useSearchParams();
  const router = useRouter();
  const message = useResponseMessage();
  const form = useForm<OTPSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
      email: "",
    },
  });

  async function onSubmit(data: OTPSchema) {
    const response = await otpAction({
      ...data,
      email: q.get("email") as string,
    });
    if (response.status === HTTP_CODE.OK) {
      toast.success(message(response.message));
      router.push("/auth/login");
    } else toast.error(message(response.message));
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type Your OTP Here</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    We just sent an OTP to your email address. type those number
                    here
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" size={"sm"} disabled={isConfirming}>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
