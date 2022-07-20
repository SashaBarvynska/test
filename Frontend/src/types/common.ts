import { AxiosError } from "axios"

export type ValidationError = AxiosError<{
  error: { fields: Record<string, string> }
}>

export type RecordValue = string | number | boolean | null | undefined
  