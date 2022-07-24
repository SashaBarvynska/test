import React, { FC, useState, ChangeEvent } from 'react'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'

import { FormModal, FormInput, useToast } from '../../components'
import { CreateUser } from '../../types'
import { createUser } from '../../api'
import { isValidationError } from '../../helpers'

interface AddUserFormProps {
  onClose: VoidFunction
  refetchUsers: VoidFunction
}

const defaultUser: CreateUser = {
  first_name: '',
  last_name: '',
  age: ''
}

export const AddUserForm: FC<AddUserFormProps> = ({ onClose, refetchUsers }) => {
  const [newUser, setNewUser] = useState<CreateUser>(defaultUser)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { addToast } = useToast()

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setNewUser((user) => ({ ...user, [name]: value }))
  }

  const { mutate } = useMutation(() => createUser(newUser), {
    onSuccess: () => {
      refetchUsers()
      onClose()
      addToast({ message: 'User successfully created!', type: 'success' })
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
    <FormModal title="Add user" onClose={onClose} onSubmit={mutate}>
      <FormInput
        title="First Name"
        name="first_name"
        placeholder="Type first name..."
        value={newUser.first_name}
        onChange={handleChange}
        errorMessage={errors['first_name']}
        maxLength={25}
      />
      <FormInput
        title="Last Name"
        name="last_name"
        placeholder="Type last name..."
        value={newUser.last_name}
        onChange={handleChange}
        errorMessage={errors['last_name']}
        maxLength={25}
      />
      <FormInput
        type="number"
        title="Age"
        name="age"
        placeholder="Type age..."
        value={newUser.age}
        min={1}
        max={99}
        onChange={handleChange}
        errorMessage={errors['age']}
      />
    </FormModal>
  )
}
