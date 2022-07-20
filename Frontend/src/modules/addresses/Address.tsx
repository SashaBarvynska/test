import { AxiosError } from 'axios'
import React, { FC, useState } from 'react'
import { useMutation } from 'react-query'
import styled from 'styled-components'
import { deleteAddress } from '../../api/address'
import { Button, ConfirmModal, InfoCard, useToast } from '../../components'
import { CardField } from '../../components/InfoCard'
import { Address as AddressType } from '../../types'
import { AddAddressForm } from './AddAddressForm'
import { UpdateAddressForm } from './UpdateAddressForm'

interface AddressProps {
  address: AddressType | null
  setAddress: (address: AddressType | null) => void
  userId: number
}

const addressFields: CardField<AddressType>[] = [
  {
    name: 'Country',
    field: 'country'
  },
  {
    name: 'City',
    field: 'city'
  },
  {
    name: 'Phone number',
    field: 'phone_number'
  }
]

interface AddressModals {
  create: boolean
  update: boolean
  deleteConfirm: boolean
}

export const Address: FC<AddressProps> = ({ address, setAddress, userId }) => {
  const [isModalOpen, setIsModalOpen] = useState<AddressModals>({
    create: false,
    update: false,
    deleteConfirm: false
  })

  const handleModal = (modal: keyof AddressModals, action: 'open' | 'close') => {
    setIsModalOpen((prevState) => ({
      ...prevState,
      [modal]: action === 'open'
    }))
  }

  const { addToast } = useToast()

  const { mutate: deleteAddressMutation } = useMutation(
    (addressId: number) => deleteAddress(addressId),
    {
      onSuccess: () => {
        setAddress(null)
        handleModal('deleteConfirm', 'close')
        addToast({ message: 'Address successfully deleted!', type: 'success' })
      },
      onError: (e: AxiosError) => {
        addToast({
          message: e.message,
          type: 'error'
        })
      }
    }
  )

  return (
    <Container>
      {address ? (
        <InfoCard
          data={address}
          fields={addressFields}
          button1={
            <Button
              icon="FiEdit"
              size="1.4em"
              tooltipText="Update address"
              onClick={() => handleModal('update', 'open')}
            />
          }
          button2={
            <Button
              icon="MdDeleteOutline"
              tooltipText="Delete address"
              onClick={() => handleModal('deleteConfirm', 'open')}
            />
          }
        />
      ) : (
        <AddNewAddressContainer>
          <h2>Add new address</h2>
          <Button
            icon="GoDiffAdded"
            size="3em"
            onClick={() => handleModal('create', 'open')}
          />
        </AddNewAddressContainer>
      )}
      {isModalOpen.create && (
        <AddAddressForm
          userId={userId}
          setAddress={setAddress}
          onClose={() => handleModal('create', 'close')}
        />
      )}
      {isModalOpen.update && address && (
        <UpdateAddressForm
          address={address}
          setAddress={setAddress}
          onClose={() => handleModal('update', 'close')}
        />
      )}
      {isModalOpen.deleteConfirm && address && (
        <ConfirmModal
          message="Are you sure you want to delete this address?"
          onConfirm={() => deleteAddressMutation(address.id)}
          onClose={() => handleModal('deleteConfirm', 'close')}
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const AddNewAddressContainer = styled.div`
  height: 17em;
  width: 24em;
  border: 0.1em solid var(--primary);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: cursive;
`
