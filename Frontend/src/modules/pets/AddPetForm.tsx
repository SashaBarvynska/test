import { AxiosError } from 'axios'
import React, { FC, useState, ChangeEvent } from 'react'
import { useMutation } from 'react-query'
import { createPet } from '../../api/pets'
import { FormModal, FormInput, FormSelect, useToast } from '../../components'
import { COUNTRY_OPTIONS, GENDER_OPTIONS } from '../../constants'
import { isValidationError } from '../../helpers/isValidationError'
import { CreatePet, Pet } from '../../types/pet'

interface AddPetFormProps {
  onClose: VoidFunction
  addPetToList: (pet: Pet) => void
}

const defaultPet: CreatePet = {
  name: '',
  type: '',
  gender: '',
  country: ''
}

const AddPetForm: FC<AddPetFormProps> = ({ onClose, addPetToList }) => {
  const [newPet, setNewPet] = useState<CreatePet>(defaultPet)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { addToast } = useToast()

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setNewPet((pet) => ({ ...pet, [name]: value }))
  }

  const { mutate } = useMutation(() => createPet(newPet), {
    onSuccess: ({ data }) => {
      addPetToList(data.pet)
      onClose()
      addToast({ message: 'Pet successfully created!', type: 'success' })
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
        options={GENDER_OPTIONS}
        title="Gender"
        name="gender"
        onChange={handleChange}
        errorMessage={errors['gender']}
      />
      <FormSelect
        options={COUNTRY_OPTIONS}
        title="Country"
        name="country"
        onChange={handleChange}
        errorMessage={errors['country']}
      />
    </FormModal>
  )
}

export { AddPetForm }
