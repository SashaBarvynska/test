import axios, { AxiosPromise } from 'axios'
import { BE_BASE_URL as URL } from '../constants'
import { Member } from '../types/member'

export const getMembers = (): AxiosPromise<{mymembers: Member[]}> => {
    return axios.get(`${URL}/members`)
}