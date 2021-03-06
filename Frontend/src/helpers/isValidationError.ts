import { AxiosError } from 'axios'

import { ValidationError } from '../types'

export const isValidationError = (error: unknown): error is ValidationError  => {
    if(error instanceof AxiosError)  {
        return Boolean(error?.response?.data?.error?.fields)
    }
   
    return false
}