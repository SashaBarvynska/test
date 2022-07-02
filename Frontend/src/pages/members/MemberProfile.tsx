import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { deleteMember, getMemberProfile } from '../../api/members'
import { FiEdit as EditIcon } from 'react-icons/fi'
import { MdDeleteOutline as DeleteIcon } from 'react-icons/md'
import { UpdateMemberForm } from '../../modules/members/UpdateMemberForm'
import { Member } from '../../types/member'
import { ConfirmModal, InfoCard, useToast } from '../../components'
import { Row } from '../../components/InfoCard'
import { AxiosError } from 'axios'

const rows: Row<Member>[] = [
  {
    title: 'First Name',
    field: 'first_name'
  },
  {
    title: 'Last Name',
    field: 'last_name'
  },
  {
    title: 'Age',
    field: 'age'
  }
]

const MemberProfile = () => {
  const [member, setMember] = useState<Member>({} as Member)
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false)
  const [isMemberDeleted, setIsMemberDeleted] = useState<boolean>(false)

  const { memberId } = useParams<string>()

  const { addToast } = useToast()

  useQuery(
    'member',
    async () => {
      const { data } = await getMemberProfile(Number(memberId))
      return data.member
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onSuccess(data) {
        setMember(data)
      }
    }
  )

  const { mutate } = useMutation(() => deleteMember(member.id), {
    onSuccess: () => {
      setIsOpenConfirmModal(false)
      setIsMemberDeleted(true)
      addToast({ message: 'Member successfully deleted!', type: 'success' })
    },
    onError: (e: AxiosError) => {
      addToast({
        message: e.message,
        type: 'error'
      })
    }
  })

  return (
    <>
      {isMemberDeleted ? (
        <DeletedProfile>
          <h2>Pet is not exist anymore!</h2>
          <Link to="/members">Return to pets</Link>
        </DeletedProfile>
      ) : (
        <InfoCard title="Member profile" fields={member} rows={rows}>
          <StyledEditIcon
            size={'1.4em'}
            onClick={() => setIsOpenUpdateModal(true)}
          />
          <StyledDeleteIcon
            size={'1.7em'}
            onClick={() => setIsOpenConfirmModal(true)}
          />
        </InfoCard>
      )}

      {isOpenUpdateModal && (
        <UpdateMemberForm
          member={{ ...member, age: String(member.age) }}
          onClose={() => setIsOpenUpdateModal(false)}
          setMemberProfile={setMember}
        />
      )}
      {isOpenConfirmModal && (
        <ConfirmModal
          message="Are you sure you want to delete this member?"
          onConfirm={mutate}
          onClose={() => setIsOpenConfirmModal(false)}
        />
      )}
    </>
  )
}

const StyledEditIcon = styled(EditIcon)`
  cursor: pointer;
`

const StyledDeleteIcon = styled(DeleteIcon)`
  cursor: pointer;
`

const DeletedProfile = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  font-family: cursive;
  align-items: center;
  font-size: 1.5em;
`

export { MemberProfile }
