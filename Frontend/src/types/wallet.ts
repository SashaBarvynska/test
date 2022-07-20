import { CurrencyEnum } from "../constants/enums"

export interface Wallet {
    id: number
    currency: CurrencyEnum
    amount: number
}

export interface CreateWallet {
    currency: string
    amount: string
}

export interface UpdateWallet {
    id: number
    currency: string
    amount: string
}