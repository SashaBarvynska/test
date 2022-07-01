import { AxiosError } from 'axios'
import React, { FC, useState, ChangeEvent } from 'react'
import { useMutation } from 'react-query'
import { createMember } from '../../api/members'
import { FormModal, FormInput } from '../../components'
import { isValidationError } from '../../helpers/isValidationError'
import { ValidationError } from '../../types/common'
import { CreateMember, Member } from '../../types/member'

interface AddMemberFormProps {
  onClose: VoidFunction
  addMemberToList: (member: Member) => void
}

const defaultMember: CreateMember = {
  first_name: '',
  last_name: '',
  age: ''
}

const AddMemberForm: FC<AddMemberFormProps> = ({
  onClose,
  addMemberToList
}) => {
  const [newMember, setNewMember] = useState<CreateMember>(defaultMember)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setNewMember((member) => ({ ...member, [name]: value }))
  }

  const { mutate } = useMutation(() => createMember(newMember), {
    onSuccess: ({ data }) => {
      addMemberToList(data.created_member)
      onClose()
    },
    onError: (e: AxiosError) => {
      if (isValidationError(e) && e.response) {
        setErrors(e.response.data.error.fields)
      } else {
        onClose()
      }
    }
  })

  return (
    <>
      <FormModal title="Add member" onClose={onClose} onSubmit={mutate}>
        <FormInput
          title="First Name"
          name="first_name"
          placeholder="Type first name..."
          value={newMember.first_name}
          onChange={handleChange}
          errorMessage={errors['first_name']}
          maxLength={25}
        />
        <FormInput
          title="Last Name"
          name="last_name"
          placeholder="Type last name..."
          value={newMember.last_name}
          onChange={handleChange}
          errorMessage={errors['last_name']}
          maxLength={25}
        />
        <FormInput
          type="number"
          title="Age"
          name="age"
          placeholder="Type age..."
          value={newMember.age}
          min={1}
          max={99}
          onChange={handleChange}
          errorMessage={errors['age']}
        />
      </FormModal>
    </>
  )
}

export { AddMemberForm }
