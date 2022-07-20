import { AxiosError } from 'axios'
import React, { FC, useState, ChangeEvent } from 'react'
import { useMutation } from 'react-query'
import { createAddress } from '../../api/address'
import { FormModal, FormInput, useToast, FormSelect } from '../../components'
import { COUNTRY_OPTIONS } from '../../constants'
import { isValidationError } from '../../helpers/isValidationError'
import { Address, CreateAddress } from '../../types/address'

interface AddAddressFormProps {
  onClose: VoidFunction
  setAddress: (address: Address) => void
  userId: number
}

const defaultAddress: CreateAddress = {
  country: '',
  city: '',
  phone_number: ''
}

export const AddAddressForm: FC<AddAddressFormProps> = ({
  onClose,
  setAddress,
  userId
}) => {
  const [newAddress, setNewAddress] = useState<CreateAddress>(defaultAddress)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { addToast } = useToast()

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setNewAddress((user) => ({ ...user, [name]: value }))
  }

  const { mutate } = useMutation(() => createAddress(userId, newAddress), {
    onSuccess: ({ data }) => {
      setAddress(data.created_address)
      onClose()
      addToast({ message: 'Address successfully created!', type: 'success' })
    },
    onError: (e: AxiosError) => {
      if (isValidationError(e) && e.response) {
        setErrors(e.response.data.error.fields)
      } else {
        addToast({
          message: e.message,
          type: 'error'
        })
      }
    }
  })

  return (
    <FormModal title="Add address" onClose={onClose} onSubmit={mutate}>
      <FormSelect
        options={COUNTRY_OPTIONS}
        title="Country"
        name="country"
        onChange={handleChange}
        errorMessage={errors['country']}
      />
      <FormInput
        title="City"
        name="city"
        placeholder="Type city..."
        value={newAddress.city}
        onChange={handleChange}
        errorMessage={errors['city']}
        maxLength={25}
      />
      <FormInput
        type="number"
        title="Phone Number"
        name="phone_number"
        placeholder="Type phone number..."
        value={newAddress.phone_number}
        min={1}
        max={9999999999}
        onChange={handleChange}
        errorMessage={errors['phone_number']}
      />
    </FormModal>
  )
}
