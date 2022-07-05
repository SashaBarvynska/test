import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { deleteMember, getMemberProfile } from '../../api/members'
import { FiEdit as EditIcon } from 'react-icons/fi'
import { MdAccountBox as ProfileIcon } from 'react-icons/md'
import { MdDeleteOutline as DeleteIcon } from 'react-icons/md'
import { AiOutlineMinusSquare as MinusIcon } from 'react-icons/ai'
import { UpdateMemberForm } from '../../modules/members/UpdateMemberForm'
import { Member } from '../../types/member'
import { ConfirmModal, InfoCard, Table, useToast } from '../../components'
import { Row } from '../../components/InfoCard'
import { AxiosError } from 'axios'
import { Column } from '../../components/Table'
import { Pet } from '../../types/pet'
import DogPlus from '../../assets/dog-plus.png'
import DogDollar from '../../assets/dog-dollar.png'
import { removePet } from '../../api/pets'

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

interface ModalsStates {
  updateMember: boolean
  deleteMember: boolean
  removePet: boolean
}

const MemberProfile = () => {
  const [member, setMember] = useState<Member>({} as Member)
  const [pets, setPets] = useState<Pet[]>([])
  const [removePetId, setRemovePetId] = useState<number>(NaN)
  const [isOpenModal, setIsOpenModal] = useState<ModalsStates>({
    updateMember: false,
    deleteMember: false,
    removePet: false
  })
  const [isMemberDeleted, setIsMemberDeleted] = useState<boolean>(false)

  const { memberId } = useParams<string>()

  const { addToast } = useToast()

  useQuery(
    'member',
    async () => {
      const { data } = await getMemberProfile(Number(memberId))
      return data
    },
    {
      refetchOnWindowFocus: false,
      onSuccess(data) {
        setMember(data.member)
        setPets(data.mypets)
      }
    }
  )

  const { mutate: deleteMemberMutation } = useMutation(
    () => deleteMember(member.id),
    {
      onSuccess: () => {
        handleModal('deleteMember', 'close')
        setIsMemberDeleted(true)
        addToast({ message: 'Member successfully deleted!', type: 'success' })
      },
      onError: (e: AxiosError) => {
        addToast({
          message: e.message,
          type: 'error'
        })
      }
    }
  )

  const { mutate: removePetMutation } = useMutation(
    () => removePet(removePetId),
    {
      onSuccess: () => {
        handleModal('removePet', 'close')
        addToast({ message: 'Pet successfully removed!', type: 'success' })
      },
      onError: (e: AxiosError) => {
        addToast({
          message: e.message,
          type: 'error'
        })
      }
    }
  )

  const handleModal = (modal: keyof ModalsStates, action: 'open' | 'close') => {
    setIsOpenModal((prevState) => ({
      ...prevState,
      [modal]: action === 'open'
    }))
  }

  const removePetConfirm = () => {
    removePetMutation()
    const petsList = [...pets]
    const index = petsList.findIndex((pet) => pet.id === removePetId)
    petsList.splice(index, 1)
    setPets(petsList)
  }

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
      header: 'Actions',
      field: 'id',
      customCell: (data) => (
        <>
          <Link to={String(data.id)}>
            <StyledProfileIcon size={'1.7em'} />
          </Link>
          <StyledMinusIcon
            size={'1.7em'}
            onClick={() => {
              setRemovePetId(data.id)
              handleModal('removePet', 'open')
            }}
          />
        </>
      )
    }
  ]

  return (
    <>
      {isMemberDeleted ? (
        <DeletedProfile>
          <h2>Member is not exist anymore!</h2>
          <Link to="/members">Return to members</Link>
        </DeletedProfile>
      ) : (
        <>
          <InfoCard title="Member profile" fields={member} rows={rows}>
            <StyledEditIcon
              title="Update member"
              size={'1.4em'}
              onClick={() => handleModal('updateMember', 'open')}
            />
            <StyledDeleteIcon
              title="Delete member"
              size={'1.7em'}
              onClick={() => handleModal('deleteMember', 'open')}
            />
          </InfoCard>

          <PetsHeaderContainer>
            <PetsHeader>Member pets:</PetsHeader>
            <Link to={`/members/${member.id}/adopt-pet`}>
              <ActionIcon title="Adopt a pet" src={DogPlus} />
            </Link>
            <Link to={`/members/${member.id}/adopt-pet`}>
              <ActionIcon title="Buy a pet" src={DogDollar} />
            </Link>
          </PetsHeaderContainer>
          <Table<Pet> records={pets} columns={columns} />
        </>
      )}

      {isOpenModal.updateMember && (
        <UpdateMemberForm
          member={{ ...member, age: String(member.age) }}
          onClose={() => handleModal('updateMember', 'close')}
          setMemberProfile={setMember}
        />
      )}
      {isOpenModal.deleteMember && (
        <ConfirmModal
          message="Are you sure you want to delete this member?"
          onConfirm={deleteMemberMutation}
          onClose={() => handleModal('deleteMember', 'close')}
        />
      )}
      {isOpenModal.removePet && (
        <ConfirmModal
          message="Are you sure you want to remove this pet?"
          onConfirm={removePetConfirm}
          onClose={() => handleModal('removePet', 'close')}
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

const PetsHeader = styled.h2`
  font-family: cursive;
  margin-right: 5em;
  display: inline-block;
`

const StyledProfileIcon = styled(ProfileIcon)`
  vertical-align: -webkit-baseline-middle;
  color: #6e3f56;
`

const PetsHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3em;
  margin-bottom: 0.9em;
`

const ActionIcon = styled.img`
  height: 3em;
  border: 0.1em solid var(--primary);
  border-radius: 0.5em;
  margin-right: 1.5em;
`

const StyledMinusIcon = styled(MinusIcon)`
  vertical-align: -webkit-baseline-middle;
  color: #6e3f56;
  margin-left: 1.5em;
  cursor: pointer;
`

export { MemberProfile }
