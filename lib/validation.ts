/**
 * Validates a Philippine mobile number.
 * Accepts formats: 09XXXXXXXXX (11 digits) or +639XXXXXXXXX
 */
export function isValidPHPhone(value: string): boolean {
  const cleaned = value.replace(/\s|-/g, "");
  return /^(09\d{9}|\+639\d{9})$/.test(cleaned);
}

export function normalizePHPhone(value: string): string {
  const cleaned = value.replace(/\s|-/g, "");
  if (cleaned.startsWith("09")) return "+63" + cleaned.slice(1);
  return cleaned;
}
