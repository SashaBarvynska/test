import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getMemberProfile } from '../../api/members'
import { FiEdit as EditIcon } from 'react-icons/fi'
import { MdDeleteOutline as DeleteIcon } from 'react-icons/md'
import { UpdateMemberForm } from '../../modules/members/UpdateMemberForm'
import { Member } from '../../types/member'
import { ConfirmModal, InfoCard, useToast } from '../../components'
import { Row } from '../../components/InfoCard'
import { Pet } from '../../types/pet'
import { deletePet, getPetProfile } from '../../api/pets'
import { UpdatePetForm } from '../../modules/pets/UpdatePetForm'
import { AxiosError } from 'axios'

const rows: Row<Pet>[] = [
  {
    title: 'Name',
    field: 'name'
  },
  {
    title: 'Type',
    field: 'type'
  },
  {
    title: 'Gender',
    field: 'gender'
  },
  {
    title: 'Country',
    field: 'country'
  }
]

const PetProfile = () => {
  const [pet, setPet] = useState<Pet>({} as Pet)
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false)
  const [isPetDeleted, setIsPetDeleted] = useState<boolean>(false)

  const { petId } = useParams<string>()

  const { addToast } = useToast()

  useQuery(
    'pet',
    async () => {
      const { data } = await getPetProfile(Number(petId))
      return data.pet
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onSuccess(data) {
        setPet(data)
      }
    }
  )

  const { mutate } = useMutation(() => deletePet(pet.id), {
    onSuccess: () => {
      setIsOpenConfirmModal(false)
      setIsPetDeleted(true)
      addToast({ message: 'Pet successfully deleted!', type: 'success' })
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
      {isPetDeleted ? (
        <DeletedProfile>
          <h2>Pet is not exist anymore!</h2>
          <Link to="/pets">Return to pets</Link>
        </DeletedProfile>
      ) : (
        <InfoCard title="Pet profile" fields={pet} rows={rows}>
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
        <UpdatePetForm
          pet={pet}
          onClose={() => setIsOpenUpdateModal(false)}
          setPetProfile={setPet}
        />
      )}
      {isOpenConfirmModal && (
        <ConfirmModal
          message="Are you sure you want to delete this pet?"
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

export { PetProfile }
