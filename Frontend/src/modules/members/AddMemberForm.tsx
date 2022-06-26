import { AxiosError } from 'axios'
import React, { FC, useState, ChangeEvent } from 'react'
import { useMutation } from 'react-query'
import { createMember } from '../../api/members'
import { FormModal, FormInput } from '../../components'
import { ValidationError } from '../../types/common'
import { CreateMember, Member } from '../../types/member'

interface AddMemberFormProps {
  onClose: VoidFunction
  addMemberToList: (member: Member) => void
}

const AddMemberForm: FC<AddMemberFormProps> = ({
  onClose,
  addMemberToList
}) => {
  const [newMember, setNewMember] = useState<CreateMember>({
    first_name: '',
    last_name: '',
    age: ''
  })
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
    onError: (e: ValidationError) => {
      if (e.response) {
        setErrors(e.response.data.error.fields)
      }
    }
  })

  return (
    <FormModal title="Add member" onClose={onClose} onSubmit={mutate}>
      <FormInput
        title="First Name"
        name="first_name"
        placeholder="Type first name..."
        value={newMember.first_name}
        onChange={handleChange}
        errorMessage={errors['first_name']}
      />
      <FormInput
        title="Last Name"
        name="last_name"
        placeholder="Type last name..."
        value={newMember.last_name}
        onChange={handleChange}
        errorMessage={errors['last_name']}
      />
      <FormInput
        type="number"
        title="Age"
        name="age"
        placeholder="Type age..."
        value={newMember.age}
        onChange={handleChange}
        errorMessage={errors['age']}
      />
    </FormModal>
  )
}

export { AddMemberForm }
