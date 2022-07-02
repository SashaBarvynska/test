import { AxiosError } from 'axios'
import React, { FC, useState, ChangeEvent } from 'react'
import { useMutation } from 'react-query'
import { updatePet } from '../../api/pets'
import { FormModal, FormInput, useToast, FormSelect } from '../../components'
import { COUNTRY_OPTIONS, GENDER_OPTIONS } from '../../constants'
import { isValidationError } from '../../helpers/isValidationError'
import { Pet, UpdatePet } from '../../types/pet'

interface UpdatePetFormProps {
  pet: UpdatePet
  onClose: VoidFunction
  setPetProfile: (pet: Pet) => void
}

const UpdatePetForm: FC<UpdatePetFormProps> = ({
  pet,
  onClose,
  setPetProfile
}) => {
  const [petData, setPetData] = useState<UpdatePet>(pet)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { addToast } = useToast()

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setPetData((pet) => ({ ...pet, [name]: value }))
  }

  const { mutate } = useMutation(() => updatePet(petData), {
    onSuccess: ({ data }) => {
      onClose()
      addToast({ message: 'Pet successfully updated!', type: 'success' })
      setPetProfile(data.updated_pet)
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
    <>
      <FormModal title="Update pet" onClose={onClose} onSubmit={mutate}>
        <FormInput
          title="Name"
          name="name"
          placeholder="Type name..."
          value={petData.name}
          onChange={handleChange}
          errorMessage={errors['name']}
          maxLength={25}
        />
        <FormInput
          title="Type"
          name="type"
          placeholder="Type type..."
          value={petData.type}
          onChange={handleChange}
          errorMessage={errors['last_name']}
          maxLength={25}
        />
        <FormSelect
          options={GENDER_OPTIONS}
          title="Gender"
          name="gender"
          defaultValue={petData.gender}
          onChange={handleChange}
          errorMessage={errors['gender']}
        />
        <FormSelect
          options={COUNTRY_OPTIONS}
          title="Country"
          name="country"
          defaultValue={petData.country}
          onChange={handleChange}
          errorMessage={errors['country']}
        />
      </FormModal>
    </>
  )
}

export { UpdatePetForm }
