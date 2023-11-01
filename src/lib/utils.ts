import { type ClassValue, clsx } from 'clsx'
import { format } from 'date-fns'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function getValidChildren(children: React.ReactNode) {
  return React.Children.toArray(children).filter((child) => React.isValidElement(child)) as React.ReactElement[]
}
export const getDate = (postedAt: string) => {
  const date = new Date(postedAt)
  return format(date, 'PPP')
}
export const getContent = (content: string) => JSON.parse(content)
