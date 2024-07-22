import { Resend } from "resend";
import { env } from "./env";

export const resend = new Resend(env.RESEND_API_KEY);

export async function sendOTP(to: string, OTP: string) {
    const resend = new Resend(env.RESEND_API_KEY);
    resend.emails.send({
        from: 'onboarding@resend.dev',
        to,
        subject: 'Verify Your Email',
        html: `<p>Your OTP code <strong style="font-weight: bold; margin: 0 10px">${OTP}</strong>!</p>`
    });
}