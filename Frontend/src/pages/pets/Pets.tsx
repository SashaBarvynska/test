import React, { FC, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { adoptPet, getPets } from '../../api/pets'
import { Column, Table } from '../../components/Table'
import { Pet } from '../../types/pet'
import styled from 'styled-components'
import { Button } from '../../components/Button'
import { AddPetForm } from '../../modules/pets/AddPetForm'
import { Link, useParams } from 'react-router-dom'
import { MdAccountBox as ProfileIcon } from 'react-icons/md'
import { AiOutlinePlusSquare as PlusIcon } from 'react-icons/ai'
import { AxiosError } from 'axios'
import { ConfirmModal, useToast } from '../../components'

interface PetsProps {
  isAdopt?: boolean
}

const Pets: FC<PetsProps> = ({ isAdopt }) => {
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false)
  const [adoptPetId, setAdoptPetId] = useState<number>(NaN)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false)

  const { addToast } = useToast()
  const { memberId } = useParams()

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

  const { mutate } = useMutation(() => adoptPet(adoptPetId, Number(memberId)), {
    onSuccess: () => {
      setIsOpenConfirmModal(false)
      addToast({ message: 'Pet successfully adopted!', type: 'success' })
    },
    onError: (e: AxiosError) => {
      addToast({
        message: e.message,
        type: 'error'
      })
    }
  })

  const addPetToList = (pet: Pet) => {
    pets.push(pet)
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
      header: 'Country',
      field: 'country'
    },
    {
      header: 'Actions',
      field: 'id',
      customCell: (data) => (
        <>
          <ProfileIconLink to={String(data.id)}>
            <StyledProfileIcon size={'1.7em'} />
          </ProfileIconLink>
          {isAdopt && (
            <StyledPlusIcon
              size={'1.6em'}
              onClick={() => {
                setAdoptPetId(data.id)
                setIsOpenConfirmModal(true)
              }}
            />
          )}
        </>
      )
    }
  ]

  return (
    <>
      <HeaderContainer>
        <StyledHeader>Pets:</StyledHeader>
        {isAdopt ? (
          <ReturnLink to={`/members/${memberId}`}>Return to profile</ReturnLink>
        ) : (
          <Button text="Add pet" onClick={() => setIsOpenAddModal(true)} />
        )}
      </HeaderContainer>
      <Table<Pet> records={pets} columns={columns} />
      {isOpenAddModal && (
        <AddPetForm
          onClose={() => setIsOpenAddModal(false)}
          addPetToList={addPetToList}
        />
      )}
      {isOpenConfirmModal && (
        <ConfirmModal
          message="Are you sure you want to adopt this pet?"
          onConfirm={mutate}
          onClose={() => setIsOpenConfirmModal(false)}
        />
      )}
    </>
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

const StyledPlusIcon = styled(PlusIcon)`
  vertical-align: -webkit-baseline-middle;
  color: #6e3f56;
  margin-left: 1.5em;
  cursor: pointer;
`

const ProfileIconLink = styled(Link)`
  color: #6e3f56;
  display: flex;
`

const ReturnLink = styled(Link)`
  color: #6e3f56;
  font-family: cursive;
  font-size: 1.3em;

  :hover {
    text-decoration: underline;
  }
`

export { Pets }
