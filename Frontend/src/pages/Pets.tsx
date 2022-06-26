import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import { getPets } from '../api/pets'
import { Table } from '../components/Table'
import { Pet } from '../types/pet'
import styled from 'styled-components'
import { Button } from '../components/Button'
import { AddPetForm } from '../modules/pets/AddPetForm'

const Pets = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { data: pets = [] } = useQuery('pets', async () => {
    const { data } = await getPets()
    return data.pets
  })

  const columns = [
    { header: 'Name', field: 'name' },
    { header: 'Type', field: 'type' },
    { header: 'Gender', field: 'gender' }
  ]

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

export { Pets }
