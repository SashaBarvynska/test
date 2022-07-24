import React, { FC, useState, ChangeEvent } from 'react'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'

import { FormModal, FormInput, useToast, FormSelect } from '../../components'
import { Address, UpdateAddress } from '../../types'
import { updateAddress } from '../../api'
import { COUNTRY_OPTIONS } from '../../constants'
import { isValidationError } from '../../helpers'

interface UpdateAddressFormProps {
  address: UpdateAddress
  onClose: VoidFunction
  setAddress: (address: Address) => void
}

export const UpdateAddressForm: FC<UpdateAddressFormProps> = ({
  address,
  onClose,
  setAddress
}) => {
  const [addressData, setAddressData] = useState<UpdateAddress>(address)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { addToast } = useToast()

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setAddressData((address) => ({ ...address, [name]: value }))
  }

  const { mutate } = useMutation(() => updateAddress(addressData), {
    onSuccess: ({ data }) => {
      onClose()
      addToast({ message: 'Address successfully updated!', type: 'success' })
      setAddress(data.updated_address)
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
    <FormModal title="Update address" onClose={onClose} onSubmit={mutate}>
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
        value={addressData.city}
        onChange={handleChange}
        errorMessage={errors['city']}
        maxLength={25}
      />
      <FormInput
        type="number"
        title="Phone Number"
        name="phone_number"
        placeholder="Type phone number..."
        value={addressData.phone_number}
        min={1}
        max={9999999999}
        onChange={handleChange}
        errorMessage={errors['phone_number']}
      />
    </FormModal>
  )
}
