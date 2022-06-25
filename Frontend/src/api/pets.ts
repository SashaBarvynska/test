import axios, { AxiosPromise } from 'axios'
import { BE_BASE_URL as URL } from '../constants'
import { Pet } from '../types/pet'

export const getPets = (): AxiosPromise<{mypets: Pet[]}> => {
    return axios.get(`${URL}/pets`)
}