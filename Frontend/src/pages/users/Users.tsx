import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import { AxiosError } from 'axios'
import styled from 'styled-components'
import { getUsers } from '../../api/user'
import { User } from '../../types'
import { Button, Table, useToast } from '../../components'
import { AddUserForm } from '../../modules/users/AddUserForm'
import { Column } from '../../components/Table'

const columns: Column<User>[] = [
  {
    header: 'First Name',
    field: 'first_name'
  },
  {
    header: 'Last Name',
    field: 'last_name'
  },
  {
    header: 'Age',
    field: 'age'
  },
  {
    header: 'Actions',
    field: 'id',
    customCell: (data) => (
      <Button icon="MdAccountBox" linkTo={String(data.id)} color="primary" />
    )
  }
]

export const Users = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { addToast } = useToast()

  const { data: users = [] } = useQuery(
    'users',
    async () => {
      const { data } = await getUsers()
      return data.users
    },
    {
      refetchOnWindowFocus: false,
      onError: (e: AxiosError) => {
        addToast({
          message: e.message,
          type: 'error'
        })
      }
    }
  )

  const addUserToList = (user: User) => {
    users.push(user)
  }

  return (
    <Fragment>
      <HeaderContainer>
        <StyledHeader>Users:</StyledHeader>
        <Button text="Add user" onClick={() => setIsOpen(true)} />
      </HeaderContainer>
      <Table<User> records={users} columns={columns} />
      {isOpen && (
        <AddUserForm onClose={() => setIsOpen(false)} addUserToList={addUserToList} />
      )}
    </Fragment>
  )
}

const StyledHeader = styled.h2`
  font-family: cursive;
  margin-bottom: 0.9em;
  display: inline-block;
`

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
