import React, { FC, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { AxiosError } from 'axios'

import { Button, useToast, Table, Column, Tooltip } from '../../components'
import { AddPetForm } from '../../modules'
import { Pet } from '../../types'
import { getPets } from '../../api'
import { getFlag } from '../../helpers'

export const Pets: FC = () => {
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false)

  const { addToast } = useToast()

  const { data: pets = [], refetch } = useQuery(
    'pets',
    async () => {
      const { data } = await getPets()
      return data.pets
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

  const columns = useMemo<Column<Pet>[]>(
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
