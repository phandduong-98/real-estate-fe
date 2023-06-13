import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import * as z from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const replacer = (key: any, value: any) =>
  typeof value === "bigint" ? value.toString() : value

export const stringify = (obj: any) => JSON.stringify(obj, replacer)

export const positiveNumberString = (input: string) => {
  return z.string().refine((val) => /^[0-9]+$/.test(val) && Number(val) > 0, {
    message: `${input} must be a positive number`,
  })
}

export const separateString = (str: string): string[] =>
  str.split(",").map((v) => v.trim())
