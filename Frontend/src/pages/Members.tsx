import React, { Fragment } from 'react'
import { useQuery } from 'react-query'
import { getMembers } from '../api/members'
import { Table } from '../components/Table'
import { Member } from '../types/member'
import styled from 'styled-components'

const Members = () => {
  const { data: members = [] } = useQuery('members', async () => {
    const { data } = await getMembers()
    return data.mymembers
  })

  const columns = [
    { header: 'First Name', field: 'firstname' },
    { header: 'Last Name', field: 'lastname' },
    { header: 'Age', field: 'age' }
  ]

  return (
    <Fragment>
      <StyledHeader>Members:</StyledHeader>
      <Table<Member> records={members} columns={columns} />
    </Fragment>
  )
}

const StyledHeader = styled.h2`
  font-family: cursive;
  margin-bottom: 0.9em;
`

export { Members }
