import React, { Fragment } from 'react'
import { useQuery } from 'react-query'
import { getPets } from '../api/pets'
import { Table } from '../components/Table'
import { Pet } from '../types/pet'
import styled from 'styled-components'

const Pets = () => {
  const { data: pets = [] } = useQuery('pets', async () => {
    const { data } = await getPets()
    return data.mypets
  })

  const columns = [
    { header: 'Name', field: 'name' },
    { header: 'Type', field: 'type' },
    { header: 'Gender', field: 'gender' }
  ]

  return (
    <Fragment>
      <StyledHeader>Pets:</StyledHeader>
      <Table<Pet> records={pets} columns={columns} />
    </Fragment>
  )
}

const StyledHeader = styled.h2`
  font-family: cursive;
  margin-bottom: 0.9em;
`

export { Pets }
