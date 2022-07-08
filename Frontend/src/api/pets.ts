import axios, { AxiosPromise } from 'axios'
import { BE_BASE_URL as URL } from '../constants'
import { CreatePet, Pet, UpdatePet } from '../types/pet'

export const getPets = (): AxiosPromise<{pets: Pet[]}> => {
    return axios.get(`${URL}/pets`)
}

export const createPet = (pet: CreatePet):AxiosPromise<{pet: Pet}>  => {
    const formData = new FormData()
    formData.append('name', pet.name)
    formData.append('type', pet.type)
    formData.append('gender', pet.gender)
    formData.append('country', pet.country)
    return axios.post(`${URL}/pets`, formData)
}

export const getPetProfile = (petId: number): AxiosPromise<{pet: Pet}> => {
    return axios.get(`${URL}/pets/${petId}`)
}

export const updatePet = (pet: UpdatePet): AxiosPromise<{ updated_pet: Pet }> => {
    const json = JSON.stringify(pet)
    return axios.put(`${URL}/pets/${pet.id}`, json)
}

export const deletePet = (petId: number): AxiosPromise<{deleted_pet: Pet}> => {
    return axios.delete(`${URL}/pets/${petId}`)
}

export const adoptPet = (petId: number, member_id: number): AxiosPromise<{ adopted_pet: Pet }> => {
    const json = JSON.stringify({ member_id })
    return axios.put(`${URL}/pets/${petId}/add`, json)
}

export const removePet = (petId: number): AxiosPromise<{ removed_pet: Pet }> => {
    return axios.put(`${URL}/pets/${petId}/remove`)
}


