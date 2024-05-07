import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  if (!date) return ''
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} `
}
