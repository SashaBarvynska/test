import { CountryEnum } from "../constants"

export interface Address {
    id: number
    country: CountryEnum
    city: string
    phone_number: string
    user_id: number
}

export interface CreateAddress extends Omit<Address, 'id' | 'country' > {
    country: string
}

export interface UpdateAddress extends Omit<Address, 'country' | 'user_id'> {
    country: string
}