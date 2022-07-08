import { AxiosError } from 'axios'
import React, { FC, useState, ChangeEvent } from 'react'
import { useMutation } from 'react-query'
import { updateMember } from '../../api/members'
import { FormModal, FormInput, useToast } from '../../components'
import { isValidationError } from '../../helpers/isValidationError'
import { Member, UpdateMember } from '../../types/member'

interface UpdateMemberFormProps {
  member: UpdateMember
  onClose: VoidFunction
  setMemberProfile: (member: Member) => void
}

const UpdateMemberForm: FC<UpdateMemberFormProps> = ({
  member,
  onClose,
  setMemberProfile
}) => {
  const [memberData, setMemberData] = useState<UpdateMember>(member)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { addToast } = useToast()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setMemberData((member) => ({ ...member, [name]: value }))
  }

  const { mutate } = useMutation(() => updateMember(memberData), {
    onSuccess: ({ data }) => {
      onClose()
      addToast({ message: 'Member successfully updated!', type: 'success' })
      setMemberProfile(data.updated_member)
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
      <FormModal title="Update member" onClose={onClose} onSubmit={mutate}>
        <FormInput
          title="First Name"
          name="first_name"
          placeholder="Type first name..."
          value={memberData.first_name}
          onChange={handleChange}
          errorMessage={errors['first_name']}
          maxLength={25}
        />
        <FormInput
          title="Last Name"
          name="last_name"
          placeholder="Type last name..."
          value={memberData.last_name}
          onChange={handleChange}
          errorMessage={errors['last_name']}
          maxLength={25}
        />
        <FormInput
          type="number"
          title="Age"
          name="age"
          placeholder="Type age..."
          value={memberData.age}
          min={1}
          max={99}
          onChange={handleChange}
          errorMessage={errors['age']}
        />
      </FormModal>
    </>
  )
}

export { UpdateMemberForm }
