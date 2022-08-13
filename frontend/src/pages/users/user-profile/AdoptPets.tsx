import React, { FC, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import styled from 'styled-components'
import { AxiosError } from 'axios'

import {
  ConfirmModal,
  useToast,
  Table,
  Column,
  Button,
  Tooltip
} from '../../../components'
import { Pet } from '../../../types'
import { adoptPet, getPets } from '../../../api'
import { getFlag } from '../../../helpers'

export const AdoptPets: FC = () => {
  const [pets, setPets] = useState<Pet[]>([])
  const [adoptPetId, setAdoptPetId] = useState<number>(NaN)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false)

  const { addToast } = useToast()
  const { userId } = useParams()

  useQuery('pets', () => getPets(), {
    refetchOnWindowFocus: false,
    onSuccess({ data }) {
      const notAdoptedPets = data.pets.filter(({ user_id }) => !user_id)
      setPets(notAdoptedPets)
    },
    onError: (e: AxiosError) => {
      addToast({
        message: e.message,
        type: 'error'
      })
    }
  })

  const { mutate } = useMutation(() => adoptPet(adoptPetId, Number(userId)), {
    onSuccess: () => {
      setPets((prevState) => prevState.filter(({ id }) => id !== adoptPetId))
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

  const columns = useMemo<Column<Pet>[]>(
    () => [
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
        field: 'country',
        customCell: ({ country }) => (
          <Tooltip text={country}>
            <img src={getFlag(country)} height="30px" />
          </Tooltip>
        )
      },
      {
        header: 'Actions',
        field: 'id',
        customCell: ({ id }) => (
          <>
            <Button icon="MdAccountBox" color="primary" linkTo={String(id)} />
            <Button
              icon="AiOutlinePlusSquare"
              color="primary"
              tooltipText="Adopt pet"
              onClick={() => {
                setAdoptPetId(id)
                setIsOpenConfirmModal(true)
              }}
            />
          </>
        )
      }
    ],
    [setAdoptPetId, setIsOpenConfirmModal, getFlag]
  )

  return (
    <>
      <HeaderContainer>
        <StyledHeader>Pets:</StyledHeader>
        <ReturnLink to={`/users/${userId}`}>Return to profile</ReturnLink>
      </HeaderContainer>

      <Table<Pet> records={pets} columns={columns} />
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

const ReturnLink = styled(Link)`
  color: #6e3f56;
  font-family: cursive;
  font-size: 1.3em;

  :hover {
    text-decoration: underline;
  }
`
