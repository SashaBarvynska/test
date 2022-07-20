import axios, { AxiosPromise } from 'axios'
import { BE_BASE_URL as URL } from '../constants'
import { User, CreateUser, UpdateUser } from '../types/user'
import { Pet } from '../types/pet'
import { Address } from '../types/address'
import { Wallet } from '../types/wallet'

export const getUsers = (): AxiosPromise<{ users: User[] }> => {
    return axios.get(`${URL}/users`)
}

export const createUser = (user: CreateUser): AxiosPromise<{ created_user: User }> => {
    return axios.post(`${URL}/users`, user)
}

export const getUserProfile = (userId: number): AxiosPromise<{ user: User, address: Address | null, wallet: Wallet | null, pets: Pet[] }> => {
    return axios.get(`${URL}/users/${userId}`)
}

export const updateUser = (user: UpdateUser): AxiosPromise<{ updated_user: User }> => {
    return axios.put(`${URL}/users/${user.id}`, user)
}

export const deleteUser = (userId: number): AxiosPromise<{ deleted_user: User }> => {
    return axios.delete(`${URL}/users/${userId}`)
}
