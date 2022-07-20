import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getUserProfile } from '../../api/user'
import { User } from '../../types/user'
import {
  ConfirmModal,
  Button,
  InfoCard,
  Table,
  useToast,
  TabsGroup,
  Tab
} from '../../components'
import { CardField } from '../../components/InfoCard'
import { AxiosError } from 'axios'
import { Column } from '../../components/Table'
import { Pet } from '../../types/pet'
import DogPlus from '../../assets/dog-plus.png'
import DogDollar from '../../assets/dog-dollar.png'
import { removePet } from '../../api/pet'
import { Address as AddressType } from '../../types/address'
import { Wallet as WalletType } from '../../types/wallet'
import { UserDetails } from '../../modules/users/UserDetails'
import { Address } from '../../modules/addresses/Address'
import { Wallet } from '../../modules/wallets/Wallet'

export const UserProfile = () => {
  const [user, setUser] = useState<User>({} as User)
  const [pets, setPets] = useState<Pet[]>([])
  const [address, setAddress] = useState<AddressType | null>(null)
  const [wallet, setWallet] = useState<WalletType | null>(null)
  const [removePetId, setRemovePetId] = useState<number>(NaN)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const { userId } = useParams<string>()

  const { addToast } = useToast()

  useQuery('user', () => getUserProfile(Number(userId)), {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    onSuccess({ data }) {
      setUser(data.user)
      setPets(data.pets)
      setAddress(data.address)
      setWallet(data.wallet)
    }
  })

  const { mutate: removePetMutation } = useMutation(() => removePet(removePetId), {
    onSuccess: () => {
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
          <Button
            icon="MdAccountBox"
            linkTo={String(data.id)}
            tooltipText="Pet profile"
            color="primary"
          />

          <Button
            icon="AiOutlineMinusSquare"
            tooltipText="Remove user pet"
            color="primary"
            onClick={() => {
              setRemovePetId(data.id)
              setIsOpenModal(true)
            }}
          />
        </>
      )
    }
  ]

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
          onConfirm={removePetConfirm}
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
