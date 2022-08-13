import React, { FC, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { AxiosError } from 'axios'

import { Button, useToast, Table, Column, Tooltip } from '../../components'
import { AddPetForm } from '../../modules'
import { Pet } from '../../types'
import { getPets, getUsers } from '../../api'
import { getFlag } from '../../helpers'

export const Pets: FC = () => {
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false)

  const { addToast } = useToast()

  const { data: pets = [], refetch } = useQuery(
    'pets',
    async () => {
      const petsResponse = await getPets()
      const usersResponse = await getUsers()

      const owners = new Map(
        usersResponse.data.users.map((user) => [
          user.id,
          `${user.first_name} ${user.last_name}`
        ])
      )

      return petsResponse.data.pets.map((pet) => {
        if (pet.user_id) {
          return { ...pet, owner: owners.get(pet.user_id) }
        }
        return pet
      })
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

  const columns = useMemo<Column<Pet & { owner?: string }>[]>(
    () => [
      {
        header: 'Name',
        field: 'name'
      },
      {
        header: 'Type',
        field: 'type'
      },
      {
        header: 'Gender',
        field: 'gender'
      },
      {
        header: 'Country',
        field: 'country',
        customCell: ({ country }) => (
          <Tooltip text={country}>
            <img src={getFlag(country)} height="30px" />
          </Tooltip>
        )
      },
      {
        header: 'Owner',
        field: 'owner'
      },
      {
        header: 'Actions',
        field: 'id',
        customCell: ({ id }) => (
          <Button icon="MdAccountBox" color="primary" linkTo={String(id)} />
        )
      }
    ],
    [getFlag]
  )

  return (
    <>
      <HeaderContainer>
        <StyledHeader>Pets:</StyledHeader>
        <Button text="Add pet" onClick={() => setIsOpenAddModal(true)} />
      </HeaderContainer>

      <Table<Pet> records={pets} columns={columns} />
      {isOpenAddModal && (
        <AddPetForm onClose={() => setIsOpenAddModal(false)} refetchPets={refetch} />
      )}
    </>
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
