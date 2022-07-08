import { CountryEnum, PetGenderEnum } from "../constants/enums"

export interface Pet {
    id: number
    name: string
    type: string
    gender: PetGenderEnum
    country: CountryEnum
}

export interface CreatePet extends Omit<Pet, 'id' | 'gender' | 'country'> {
    gender: string
    country: string
}

export interface UpdatePet extends Omit<Pet, 'gender' | 'country'> {
    gender: string
    country: string
}