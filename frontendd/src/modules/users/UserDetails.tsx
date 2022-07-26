import React, { FC, useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

import { Button, ConfirmModal, InfoCard, CardField, useToast } from '../../components'
import { User } from '../../types'
import { deleteUser } from '../../api'
import { UpdateUserForm } from './UpdateUserForm'

const fields: CardField<User>[] = [
  {
    name: 'First Name',
    field: 'first_name'
  },
  {
    name: 'Last Name',
    field: 'last_name'
  },
  {
    name: 'Age',
    field: 'age'
  }
]

interface UserDetailsProps {
  user: User
  setUser: (user: User) => void
}

export const UserDetails: FC<UserDetailsProps> = ({ user, setUser }) => {
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)

  const navigate = useNavigate()
  const { addToast } = useToast()

  const { mutate: deleteUserMutation } = useMutation(() => deleteUser(user.id), {
    onSuccess: () => {
      navigate('/users', { replace: true })
      setIsOpenDeleteModal(false)
      addToast({ message: 'User successfully deleted!', type: 'success' })
    },
    onError: (e: AxiosError) => {
      addToast({
        message: e.message,
        type: 'error'
      })
    }
  })

  return (
    <>
      <InfoCard<User>
        data={user}
        fields={fields}
        button1={
          <Button
            icon="FiEdit"
            size="1.4em"
            tooltipText="Update user"
            onClick={() => setIsOpenUpdateModal(true)}
          />
        }
        button2={
          <Button
            icon="MdDeleteOutline"
            tooltipText="Delete user"
            onClick={() => setIsOpenDeleteModal(true)}
          />
        }
      />
      {isOpenUpdateModal && (
        <UpdateUserForm
          user={{ ...user, age: String(user.age) }}
          onClose={() => setIsOpenUpdateModal(false)}
          setUser={setUser}
        />
      )}
      {isOpenDeleteModal && (
        <ConfirmModal
          message="Are you sure you want to delete this user?"
          onConfirm={deleteUserMutation}
          onClose={() => setIsOpenDeleteModal(false)}
        />
      )}
    </>
  )
}
