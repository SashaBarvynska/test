import React, { useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { AxiosError } from 'axios'

import {
  ConfirmModal,
  Button,
  Table,
  Column,
  useToast,
  TabsGroup,
  Tab
} from '../../../components'
import { UserDetails, Address, Wallet } from '../../../modules'
import { User, Pet, Address as AddressType, Wallet as WalletType } from '../../../types'
import { getUserProfile, removePet } from '../../../api'
import DogPlus from '../../../assets/dog-plus.png'
import DogDollar from '../../../assets/dog-dollar.png'

export const UserProfile = () => {
  const [user, setUser] = useState<User>({} as User)
  const [pets, setPets] = useState<Pet[]>([])
  const [address, setAddress] = useState<AddressType | null>(null)
  const [wallet, setWallet] = useState<WalletType | null>(null)
  const [removePetId, setRemovePetId] = useState<number>(NaN)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const { userId } = useParams()
  const { addToast } = useToast()

  useQuery('user', () => getUserProfile(Number(userId)), {
    refetchOnWindowFocus: false,
    onSuccess({ data }) {
      setUser(data.user)
      setPets(data.pets)
      setAddress(data.address)
      setWallet(data.wallet)
    }
  })

  const { mutate: removePetMutation } = useMutation(() => removePet(removePetId), {
    onSuccess: () => {
      setPets((prevState) => prevState.filter(({ id }) => id !== removePetId))
      setIsOpenModal(false)
      addToast({ message: 'Pet successfully removed!', type: 'success' })
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
        header: 'Actions',
        field: 'id',
        customCell: ({ id }) => (
          <>
            <Button
              icon="MdAccountBox"
              linkTo={String(id)}
              tooltipText="Pet profile"
              color="primary"
            />

            <Button
              icon="AiOutlineMinusSquare"
              tooltipText="Remove user pet"
              color="primary"
              onClick={() => {
                setRemovePetId(id)
                setIsOpenModal(true)
              }}
            />
          </>
        )
      }
    ],
    [setRemovePetId, setIsOpenModal]
  )

  return (
    <>
      <>
        <Header>User profile:</Header>
        <ProfileContainer>
          <TabsGroup>
            <Tab
              key="details"
              title="Details"
              content={<UserDetails user={user} setUser={setUser} />}
            />
            <Tab
              key="address"
              title="Address"
              content={
                <Address address={address} setAddress={setAddress} userId={user.id} />
              }
            />
            <Tab
              key="wallet"
              title="Wallet"
              content={<Wallet wallet={wallet} setWallet={setWallet} userId={user.id} />}
            />
          </TabsGroup>
        </ProfileContainer>

        <PetsHeaderContainer>
          <Header>User pets:</Header>
          <Button
            src={DogPlus}
            linkTo={`/users/${user.id}/adopt-pet`}
            tooltipText="Adopt a pet"
          />
          <Button
            src={DogDollar}
            linkTo={`/users/${user.id}/adopt-pet`}
            tooltipText="Buy a pet"
          />
        </PetsHeaderContainer>
        <Table<Pet> records={pets} columns={columns} />
      </>

      {isOpenModal && (
        <ConfirmModal
          message="Are you sure you want to remove this pet?"
          onConfirm={removePetMutation}
          onClose={() => setIsOpenModal(false)}
        />
      )}
    </>
  )
}

const Header = styled.h2`
  font-family: cursive;
  margin-right: 5em;
  display: inline-block;
`

const PetsHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3em;
  margin-bottom: 0.9em;
`

const ProfileContainer = styled.div`
  min-height: 22em;
`
