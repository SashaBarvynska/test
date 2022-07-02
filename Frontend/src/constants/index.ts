import { Option } from "../components/form/FormSelect"
import { CountryEnum, PetGenderEnum } from "./enums"

export const BE_BASE_URL = 'http://127.0.0.1:8000'

export const GENDER_OPTIONS: Option[] = [
  { value: PetGenderEnum.male, title: 'Male' },
  { value: PetGenderEnum.female, title: 'Female' }
]

export const COUNTRY_OPTIONS: Option[] = [
  { value: CountryEnum.USA, title: 'United States' },
  { value: CountryEnum.Germany, title: 'Germany' },
  { value: CountryEnum.Ukraine, title: 'Ukraine' },
  { value: CountryEnum.UK, title: 'United Kingdom' },
  { value: CountryEnum.China, title: 'China' }
]
