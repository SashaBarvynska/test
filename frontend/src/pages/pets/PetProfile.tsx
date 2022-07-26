import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { AxiosError } from 'axios'

import { Button, ConfirmModal, InfoCard, CardField, useToast } from '../../components'
import { UpdatePetForm } from '../../modules'
import { Pet } from '../../types'
import { deletePet, getPetProfile } from '../../api'

const fields: CardField<Pet>[] = [
  {
    name: 'Name',
    field: 'name'
  },
  {
    name: 'Type',
    field: 'type'
  },
  {
    name: 'Gender',
    field: 'gender'
  },
  {
    name: 'Country',
    field: 'country'
  }
]

export const PetProfile = () => {
  const [pet, setPet] = useState<Pet>({} as Pet)
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false)

  const navigate = useNavigate()
  const { petId } = useParams()
  const { addToast } = useToast()

  useQuery(
    'pet',
    async () => {
      const { data } = await getPetProfile(Number(petId))
      return data.pet
    },
    {
      refetchOnWindowFocus: false,
      onSuccess(data) {
        setPet(data)
      }
    }
  )

  const { mutate } = useMutation(() => deletePet(pet.id), {
    onSuccess: () => {
      navigate('/pets', { replace: true })
      setIsOpenConfirmModal(false)
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
      <InfoCard
        title="Pet profile"
        data={pet}
        fields={fields}
        button1={
          <Button
            icon="FiEdit"
            size="1.4em"
            tooltipText="Edit pet"
            onClick={() => setIsOpenUpdateModal(true)}
          />
        }
        button2={
          <Button
            icon="MdDeleteOutline"
            tooltipText="Delete pet"
            onClick={() => setIsOpenConfirmModal(true)}
          />
        }
      />

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
