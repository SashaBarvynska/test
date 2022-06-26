import { AxiosError } from "axios"

export type ValidationError = AxiosError<{
    error: { fields: Record<string, string> }
  }>
  