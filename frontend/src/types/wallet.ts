import { CurrencyEnum } from "../constants"

export interface Wallet {
    id: number
    currency: CurrencyEnum
    amount: number
    user_id: number
}

export interface CreateWallet extends Omit<Wallet, 'id' | 'currency' | 'amount' > {
    currency: string
    amount: string
}

export interface UpdateWallet extends Omit<Wallet, 'currency' | 'amount' | 'user_id'> {
    currency: string
    amount: string
}