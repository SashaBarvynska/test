import { AxiosError } from 'axios'
import React, { FC, useState, ChangeEvent } from 'react'
import { useMutation } from 'react-query'
import { createPet } from '../../api/pets'
import { FormModal, FormInput } from '../../components'
import { CreatePet, Pet } from '../../types/pet'

interface AddPetFormProps {
  onClose: VoidFunction
  addPetToList: (pet: Pet) => void
}

type ValidationError = AxiosError<{
  error: { fields: Record<string, string> }
}>

const AddPetForm: FC<AddPetFormProps> = ({
  onClose,
  addPetToList
}) => {
  const [newPet, setNewPet] = useState<CreatePet>({
    name: '',
    gender: '',
    type: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setNewPet((pet) => ({ ...pet, [name]: value }))
  }

  const { mutate } = useMutation(() => createPet(newPet), {
    onSuccess: ({ data }) => {
      addPetToList(data.updated_pet)
      onClose()
    },
    onError: (e: ValidationError) => {
      if (e.response) {
        setErrors(e.response.data.error.fields)
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
      <FormInput
        title="Gender"
        name="gender"
        placeholder="Type gender..."
        value={newPet.gender}
        onChange={handleChange}
        errorMessage={errors['gender']}
      />
    </FormModal>
  )
}

export { AddPetForm }
