import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { AxiosError } from 'axios'

import { Button, Table, Column, useToast } from '../../components'
import { AddUserForm } from '../../modules'
import { User } from '../../types'
import { getUsers } from '../../api'

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
    customCell: ({ id }) => (
      <Button icon="MdAccountBox" linkTo={String(id)} color="primary" />
    )
  }
]

export const Users = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { addToast } = useToast()

  const { data: users = [], refetch } = useQuery(
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

  return (
    <Fragment>
      <HeaderContainer>
        <StyledHeader>Users:</StyledHeader>
        <Button text="Add user" onClick={() => setIsOpen(true)} />
      </HeaderContainer>
      <Table<User> records={users} columns={columns} />
      {isOpen && <AddUserForm onClose={() => setIsOpen(false)} refetchUsers={refetch} />}
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
