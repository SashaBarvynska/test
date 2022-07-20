import { CountryEnum } from "../constants/enums"

export interface Address {
    id: number
    country: CountryEnum
    city: string
    phone_number: string
}

export interface CreateAddress extends Omit<Address, 'id' | 'country' > {
    country: string
}

export interface UpdateAddress extends Omit<Address, 'country' > {
    country: string
}