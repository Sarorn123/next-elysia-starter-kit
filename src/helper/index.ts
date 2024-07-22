export function generateOTP(): string {
    // Generate a random 6-digit number
    const otp = Math.floor(100000 + Math.random() * 900000);
    // Convert the number to a string and return it
    return otp.toString();
}