import React, { FC, useState, ChangeEvent } from 'react'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'

import { FormModal, FormInput, useToast, FormSelect } from '../../components'
import { UpdateWallet, Wallet } from '../../types'
import { updateWallet } from '../../api'
import { CURRENCY_OPTIONS } from '../../constants'
import { isValidationError } from '../../helpers'

interface UpdateWalletFormProps {
  wallet: UpdateWallet
  onClose: VoidFunction
  setWallet: (wallet: Wallet) => void
}

export const UpdateWalletForm: FC<UpdateWalletFormProps> = ({
  wallet,
  onClose,
  setWallet
}) => {
  const [walletData, setWalletData] = useState<UpdateWallet>(wallet)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { addToast } = useToast()

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setWalletData((wallet) => ({ ...wallet, [name]: value }))
  }

  const { mutate } = useMutation(() => updateWallet(walletData), {
    onSuccess: ({ data }) => {
      onClose()
      addToast({ message: 'Wallet successfully updated!', type: 'success' })
      setWallet(data.updated_wallet)
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
    <FormModal title="Update wallet" onClose={onClose} onSubmit={mutate}>
      <FormSelect
        options={CURRENCY_OPTIONS}
        defaultValue={walletData.currency}
        title="Currency"
        name="currency"
        onChange={handleChange}
        errorMessage={errors['currency']}
      />
      <FormInput
        type="number"
        title="Amount"
        name="amount"
        placeholder="Type amount..."
        value={walletData.amount}
        min={1}
        max={99999}
        onChange={handleChange}
        errorMessage={errors['amount']}
      />
    </FormModal>
  )
}
