import axios, { AxiosPromise } from 'axios'
import { BE_BASE_URL as URL } from '../constants'
import { Address, CreateAddress, UpdateAddress } from '../types/address'

export const createAddress = (address: CreateAddress): AxiosPromise<{ created_address: Address }> => {
    return axios.post(`${URL}/addresses`, address)
}

export const updateAddress = (address: UpdateAddress): AxiosPromise<{ updated_address: Address }> => {
    return axios.put(`${URL}/addresses/${address.id}`, address)
}

export const deleteAddress = (addressId: number): AxiosPromise<{ deleted_address: Address }> => {
    return axios.delete(`${URL}/addresses/${addressId}`)
}
