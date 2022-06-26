import axios, { AxiosPromise } from 'axios'
import { BE_BASE_URL as URL } from '../constants'
import { CreateMember, Member } from '../types/member'

export const getMembers = (): AxiosPromise<{members: Member[]}> => {
    return axios.get(`${URL}/members`)
}

export const createMember = (member: CreateMember):AxiosPromise<{created_member: Member}>  => {
    const formData = new FormData()
    formData.append('first_name', member.first_name)
    formData.append('last', member.last_name)
    formData.append('age', member.age)
    return axios.post(`${URL}/members`, formData)
}