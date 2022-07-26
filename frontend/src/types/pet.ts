import { CountryEnum, GenderEnum } from "../constants"

export interface Pet {
    id: number
    name: string
    type: string
    gender: GenderEnum
    country: CountryEnum
    user_id: number | null
}

export interface CreatePet extends Omit<Pet, 'id' | 'user_id' | 'gender' | 'country' > {
    gender: string
    country: string
}

export interface UpdatePet extends Omit<Pet, 'gender' | 'country' | 'user_id'> {
    gender: string
    country: string
}