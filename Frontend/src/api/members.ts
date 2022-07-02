import axios, { AxiosPromise } from 'axios'
import { BE_BASE_URL as URL } from '../constants'
import { CreateMember, Member, UpdateMember } from '../types/member'
import { Pet } from '../types/pet'

export const getMembers = (): AxiosPromise<{ members: Member[] }> => {
    return axios.get(`${URL}/members`)
}

export const createMember = (member: CreateMember): AxiosPromise<{ created_member: Member }> => {
    const formData = new FormData()
    formData.append('first_name', member.first_name)
    formData.append('last_name', member.last_name)
    formData.append('age', member.age)
    return axios.post(`${URL}/members`, formData)
}

export const getMemberProfile = (memberId: number): AxiosPromise<{ member: Member, mypets: Pet[] }> => {
    return axios.get(`${URL}/members/${memberId}`)
}

export const updateMember = (member: UpdateMember): AxiosPromise<{ updated_member: Member }> => {
    const json = JSON.stringify(member)
    return axios.put(`${URL}/members/${member.id}`, json)
}

export const deleteMember = (memberId: number): AxiosPromise<{ deleted_member: Member }> => {
    return axios.delete(`${URL}/members/${memberId}`)
}
