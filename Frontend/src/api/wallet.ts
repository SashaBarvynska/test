import axios, { AxiosPromise } from 'axios'
import { BE_BASE_URL as URL } from '../constants'
import { CreateWallet, UpdateWallet, Wallet } from '../types/wallet'

export const createWallet = (userId: number, wallet: CreateWallet): AxiosPromise<{ created_wallet: Wallet }> => {
    const data = {...wallet, user_id: userId}
    return axios.post(`${URL}/wallets`, data)
}

export const updateWallet = (wallet: UpdateWallet): AxiosPromise<{ updated_wallet: Wallet }> => {
    return axios.put(`${URL}/wallets/${wallet.id}`, wallet)
}

export const deleteWallet = (walletId: number): AxiosPromise<{ deleted_wallet: Wallet }> => {
    return axios.delete(`${URL}/wallets/${walletId}`)
}
