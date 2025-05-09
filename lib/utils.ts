import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const hostIp = `http://192.168.16.224:3001`;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
