import axios, { AxiosPromise } from 'axios'
import { BE_BASE_URL as URL } from '../constants'
import { CreatePet, Pet } from '../types/pet'

export const getPets = (): AxiosPromise<{pets: Pet[]}> => {
    return axios.get(`${URL}/pets`)
}

export const createPet = (pet: CreatePet):AxiosPromise<{created_pet: Pet}>  => {
    const formData = new FormData()
    formData.append('name', pet.name)
    formData.append('type', pet.type)
    formData.append('gender', pet.gender)
    return axios.post(`${URL}/pets`, formData)
}