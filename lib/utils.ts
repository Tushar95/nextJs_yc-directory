import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

export function formatViews(viewCount?: number) {
  if (typeof viewCount !== 'number' || viewCount < 1) {
    return '0 views';
  }
  return `${viewCount} view${viewCount === 1 ? '' : 's'}`;
}

export function parseServerActionResp<T>(response: T) {
  return JSON.parse(JSON.stringify(response));
}