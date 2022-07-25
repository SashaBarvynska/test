import React, { FC, useState, ChangeEvent } from 'react'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'

import { FormModal, FormInput, useToast, FormSelect } from '../../components'
import { CreateWallet, Wallet } from '../../types'
import { createWallet } from '../../api'
import { CURRENCY_OPTIONS } from '../../constants'
import { isValidationError } from '../../helpers'

interface AddWalletFormProps {
  onClose: VoidFunction
  setWallet: (wallet: Wallet) => void
  userId: number
}

const defaultWallet: CreateWallet = {
  currency: '',
  amount: '',
  user_id: NaN
}

export const AddWalletForm: FC<AddWalletFormProps> = ({ onClose, setWallet, userId }) => {
  const [newWallet, setNewWallet] = useState<CreateWallet>({
    ...defaultWallet,
    user_id: userId
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { addToast } = useToast()

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setNewWallet((wallet) => ({ ...wallet, [name]: value }))
  }

  const { mutate } = useMutation(() => createWallet(newWallet), {
    onSuccess: ({ data }) => {
      setWallet(data.created_wallet)
      onClose()
      addToast({ message: 'Wallet successfully created!', type: 'success' })
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
    <FormModal title="Add wallet" onClose={onClose} onSubmit={mutate}>
      <FormSelect
        options={CURRENCY_OPTIONS}
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
        value={newWallet.amount}
        min={1}
        max={99999}
        onChange={handleChange}
        errorMessage={errors['amount']}
      />
    </FormModal>
  )
}
