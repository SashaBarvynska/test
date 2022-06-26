import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { getMembers } from '../api/members'
import { Member } from '../types/member'
import { Button, Table } from '../components'
import { AddMemberForm } from '../modules/members/AddMemberForm'

const Members = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { data: members = [] } = useQuery('members', async () => {
    const { data } = await getMembers()
    return data.mymembers
  })

  const columns = [
    { header: 'First Name', field: 'firs_tname' },
    { header: 'Last Name', field: 'last_name' },
    { header: 'Age', field: 'age' }
  ]

  const addMemberToList = (member: Member) => {
    members.push(member)
  }

  return (
    <Fragment>
      <HeaderContainer>
        <StyledHeader>Members:</StyledHeader>
        <Button text="Add member" onClick={() => setIsOpen(true)} />
      </HeaderContainer>
      <Table<Member> records={members} columns={columns} />
      {isOpen && (
        <AddMemberForm
          onClose={() => setIsOpen(false)}
          addMemberToList={addMemberToList}
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

export { Members }
