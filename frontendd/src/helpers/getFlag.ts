import { CountryEnum } from "../constants"
import FlagUkraine from '../assets/flag-ukraine.png'
import FlagUsa from '../assets/flag-usa.png'
import FlagGreatBritain from '../assets/flag-great-britain.png'
import FlagGermany from '../assets/flag-germany.png'
import FlagChina from '../assets/flag-china.png'

export const getFlag = (country: CountryEnum): string => {
    switch(country) {
        case 'Ukraine':
            return FlagUkraine
        case 'United States':
            return FlagUsa
        case 'United Kingdom':
            return FlagGreatBritain
        case 'Germany':
            return FlagGermany
        case 'China':
            return FlagChina
    }

    return ''
}