import { AxiosError } from 'axios'
import React, { FC, useState, ChangeEvent } from 'react'
import { useMutation } from 'react-query'
import { createPet } from '../../api/pets'
import { FormModal, FormInput, FormSelect, useToast } from '../../components'
import { Option } from '../../components/form/FormSelect'
import { PetGenderEnum } from '../../constants/enums'
import { isValidationError } from '../../helpers/isValidationError'
import { CreatePet, Pet } from '../../types/pet'

interface AddPetFormProps {
  onClose: VoidFunction
  addPetToList: (pet: Pet) => void
}

const defaultPet: CreatePet = {
  name: '',
  gender: '',
  type: ''
}

const genderOptions: Option[] = [
  { value: PetGenderEnum.male, title: 'Male' },
  { value: PetGenderEnum.female, title: 'Female' }
]

const AddPetForm: FC<AddPetFormProps> = ({ onClose, addPetToList }) => {
  const [newPet, setNewPet] = useState<CreatePet>(defaultPet)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { addToast } = useToast()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setNewPet((pet) => ({ ...pet, [name]: value }))
  }

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target
    setNewPet((pet) => ({ ...pet, [name]: value }))
  }

  const { mutate } = useMutation(() => createPet(newPet), {
    onSuccess: ({ data }) => {
      addPetToList(data.created_pet)
      onClose()
    },
    onError: (e: AxiosError) => {
      if (isValidationError(e) && e.response) {
        setErrors(e.response.data.error.fields)
      } else {
        addToast({
          message: e.message,
          type: 'error'
        })
      }
    }
  })

  return (
    <FormModal title="Add pet" onClose={onClose} onSubmit={mutate}>
      <FormInput
        title="Name"
        name="name"
        placeholder="Type name..."
        value={newPet.name}
        onChange={handleChange}
        errorMessage={errors['name']}
      />
      <FormInput
        title="Type"
        name="type"
        placeholder="Type type..."
        value={newPet.type}
        onChange={handleChange}
        errorMessage={errors['type_field']}
      />
      <FormSelect
        options={genderOptions}
        title="Gender"
        name="gender"
        onChange={handleSelect}
        errorMessage={errors['gender']}
      />
      <FormSelect
        options={genderOptions}
        title="Gender"
        name="gender"
        onChange={handleSelect}
        errorMessage={errors['gender']}
      />
    </FormModal>
  )
}

export { AddPetForm }
