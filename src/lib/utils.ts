import { type ClassValue, clsx } from 'clsx'
import { format } from 'date-fns'
import dayjs from 'dayjs'
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
export function getDay(date: Date) {
  const day = date.getDay()
  return day === 0 ? 6 : day - 1
}

export function startOfWeek(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - getDay(date) - 1)
}

export function endOfWeek(date: Date) {
  return dayjs(new Date(date.getFullYear(), date.getMonth(), date.getDate() + (6 - getDay(date))))
    .endOf('date')
    .toDate()
}

export function isInWeekRange(date: Date, value: Date | null) {
  return value ? dayjs(date).isBefore(endOfWeek(value)) && dayjs(date).isAfter(startOfWeek(value)) : false
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function formatDates(startDate: string, endDate: string) {
  const covnertStartDate = new Date(startDate)
  const covnertEndDate = new Date(endDate)
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit' }
  const formattedStartDate = covnertStartDate.toLocaleDateString('en-GB', options)
  const formattedEndDate = covnertEndDate.toLocaleDateString('en-GB', options)

  return `${formattedStartDate} - ${formattedEndDate}`
}
