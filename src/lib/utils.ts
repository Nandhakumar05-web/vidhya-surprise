import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function seededValue(seed: number) {
  const value = Math.sin(seed) * 10000
  return value - Math.floor(value)
}
