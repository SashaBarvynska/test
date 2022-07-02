import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import { getPets } from '../../api/pets'
import { Column, Table } from '../../components/Table'
import { Pet } from '../../types/pet'
import styled from 'styled-components'
import { Button } from '../../components/Button'
import { AddPetForm } from '../../modules/pets/AddPetForm'
import { Link } from 'react-router-dom'
import { MdAccountBox as ProfileIcon } from 'react-icons/md'
import { AxiosError } from 'axios'
import { useToast } from '../../components'

const columns: Column<Pet>[] = [
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
    field: 'country'
  },
  {
    header: 'Actions',
    field: 'id',
    customCell: (data) => (
      <StyledLink to={String(data.id)}>
        <StyledProfileIcon size={'1.7em'} />
      </StyledLink>
    )
  }
]

const Pets = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { addToast } = useToast()

  const { data: pets = [] } = useQuery(
    'pets',
    async () => {
      const { data } = await getPets()
      return data.pets
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onError: (e: AxiosError) => {
        addToast({
          message: e.message,
          type: 'error'
        })
      }
    }
  )

  const addPetToList = (pet: Pet) => {
    pets.push(pet)
  }

  return (
    <Fragment>
      <HeaderContainer>
        <StyledHeader>Pets:</StyledHeader>
        <Button text="Add pet" onClick={() => setIsOpen(true)} />
      </HeaderContainer>
      <Table<Pet> records={pets} columns={columns} />
      {isOpen && (
        <AddPetForm
          onClose={() => setIsOpen(false)}
          addPetToList={addPetToList}
        />
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

const StyledProfileIcon = styled(ProfileIcon)`
  vertical-align: -webkit-baseline-middle;
  color: #6e3f56;
`

const StyledLink = styled(Link)`
  color: #6e3f56;
`

export { Pets }
