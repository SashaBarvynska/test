import { PetGenderEnum } from "../constants/enums"

export interface Pet {
    id: number
    name: string
    type: string
    gender: PetGenderEnum
}

export interface CreatePet extends Omit<Pet, 'id' | 'gender'> {
    gender: string
}