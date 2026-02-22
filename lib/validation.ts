export function validatePhoneNumber(value: string): string | null {
  const digits = value.replace(/\D/g, "");
  if (digits.length < 10) return "Enter a valid phone number (at least 10 digits).";
  if (!/^09\d{9}$/.test(digits) && digits.length !== 10) return "Philippine mobile numbers usually start with 09.";
  return null;
}
