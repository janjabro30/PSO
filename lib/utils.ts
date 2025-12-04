import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a phone number for use in tel: links by removing spaces and special characters
 * @param phone - Phone number string (e.g., "46 91 19 11" or "+47 12 34 56 78")
 * @returns Formatted phone number for tel: link (e.g., "46911911" or "+4712345678")
 */
export function formatPhoneForTel(phone: string): string {
  return phone.replace(/\s/g, '')
}
