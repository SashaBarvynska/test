import React, { FC, useState, ChangeEvent } from 'react'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'

import { FormModal, FormInput, useToast } from '../../components'
import { User, UpdateUser } from '../../types'
import { updateUser } from '../../api'
import { isValidationError } from '../../helpers'

interface UpdateUserFormProps {
  user: UpdateUser
  onClose: VoidFunction
  setUser: (user: User) => void
}

export const UpdateUserForm: FC<UpdateUserFormProps> = ({ user, onClose, setUser }) => {
  const [userData, setUserData] = useState<UpdateUser>(user)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { addToast } = useToast()

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setUserData((user) => ({ ...user, [name]: value }))
  }

  const { mutate } = useMutation(() => updateUser(userData), {
    onSuccess: ({ data }) => {
      onClose()
      addToast({ message: 'User successfully updated!', type: 'success' })
      setUser(data.updated_user)
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
    <FormModal title="Update user" onClose={onClose} onSubmit={mutate}>
      <FormInput
        title="First Name"
        name="first_name"
        placeholder="Type first name..."
        value={userData.first_name}
        onChange={handleChange}
        errorMessage={errors['first_name']}
        maxLength={25}
      />
      <FormInput
        title="Last Name"
        name="last_name"
        placeholder="Type last name..."
        value={userData.last_name}
        onChange={handleChange}
        errorMessage={errors['last_name']}
        maxLength={25}
      />
      <FormInput
        type="number"
        title="Age"
        name="age"
        placeholder="Type age..."
        value={userData.age}
        min={1}
        max={99}
        onChange={handleChange}
        errorMessage={errors['age']}
      />
    </FormModal>
  )
}
