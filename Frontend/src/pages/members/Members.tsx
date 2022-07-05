import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { getMembers } from '../../api/members'
import { Member } from '../../types/member'
import { Button, Table, useToast } from '../../components'
import { AddMemberForm } from '../../modules/members/AddMemberForm'
import { Column } from '../../components/Table'
import { Link } from 'react-router-dom'
import { MdAccountBox as ProfileIcon } from 'react-icons/md'
import { AxiosError } from 'axios'

const columns: Column<Member>[] = [
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
      <StyledLink to={String(data.id)}>
        <StyledProfileIcon size={'1.7em'} />
      </StyledLink>
    )
  }
]

const Members = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { addToast } = useToast()

  const { data: members = [] } = useQuery(
    'members',
    async () => {
      const { data } = await getMembers()
      return data.members
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

const StyledProfileIcon = styled(ProfileIcon)`
  vertical-align: -webkit-baseline-middle;
`

const StyledLink = styled(Link)`
  color: #6e3f56;
  display: flex;
`

export { Members }
