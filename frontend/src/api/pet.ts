import axios, { AxiosPromise } from 'axios'
import { BE_BASE_URL as URL } from '../constants'
import { CreatePet, Pet, UpdatePet } from '../types/pet'

export const getPets = (): AxiosPromise<{pets: Pet[]}> => {
    return axios.get(`${URL}/pets`)
}

export const createPet = (pet: CreatePet):AxiosPromise<{pet: Pet}>  => {
    return axios.post(`${URL}/pets`, pet)
}

export const getPetProfile = (petId: number): AxiosPromise<{pet: Pet}> => {
    return axios.get(`${URL}/pets/${petId}`)
}

export const updatePet = (pet: UpdatePet): AxiosPromise<{ updated_pet: Pet }> => {
    return axios.put(`${URL}/pets/${pet.id}`, pet)
}

export const deletePet = (petId: number): AxiosPromise<{deleted_pet: Pet}> => {
    return axios.delete(`${URL}/pets/${petId}`)
}

export const adoptPet = (petId: number, user_id: number): AxiosPromise<{ adopted_pet: Pet }> => {
    const data = { user_id }
    return axios.put(`${URL}/pets/${petId}/add`, data)
}

export const removePet = (petId: number): AxiosPromise<{ removed_pet: Pet }> => {
    return axios.put(`${URL}/pets/${petId}/remove`)
}


