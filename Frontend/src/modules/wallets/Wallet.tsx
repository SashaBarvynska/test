import { AxiosError } from 'axios'
import React, { FC, useState } from 'react'
import { useMutation } from 'react-query'
import styled from 'styled-components'
import { deleteWallet } from '../../api/wallet'
import { Button, ConfirmModal, InfoCard, useToast } from '../../components'
import { CardField } from '../../components/InfoCard'
import { Wallet as WalletType } from '../../types'
import { AddWalletForm } from './AddWalletForm'
import { UpdateWalletForm } from './UpdateWalletForm'

interface WalletProps {
  wallet: WalletType | null
  setWallet: (wallet: WalletType | null) => void
  userId: number
}

const walletFields: CardField<WalletType>[] = [
  {
    name: 'Currency',
    field: 'currency'
  },
  {
    name: 'Amount',
    field: 'amount'
  }
]

interface WalletModals {
  create: boolean
  update: boolean
  deleteConfirm: boolean
}

export const Wallet: FC<WalletProps> = ({ wallet, setWallet, userId }) => {
  const [isModalOpen, setIsModalOpen] = useState<WalletModals>({
    create: false,
    update: false,
    deleteConfirm: false
  })

  const handleModal = (modal: keyof WalletModals, action: 'open' | 'close') => {
    setIsModalOpen((prevState) => ({
      ...prevState,
      [modal]: action === 'open'
    }))
  }

  const { addToast } = useToast()

  const { mutate: deleteWalletMutation } = useMutation(
    (walletId: number) => deleteWallet(walletId),
    {
      onSuccess: () => {
        setWallet(null)
        handleModal('deleteConfirm', 'close')
        addToast({ message: 'Wallet successfully deleted!', type: 'success' })
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
      {wallet ? (
        <InfoCard
          data={wallet}
          fields={walletFields}
          button1={
            <Button
              icon="FiEdit"
              size="1.4em"
              tooltipText="Update wallet"
              onClick={() => handleModal('update', 'open')}
            />
          }
          button2={
            <Button
              icon="MdDeleteOutline"
              tooltipText="Delete wallet"
              onClick={() => handleModal('deleteConfirm', 'open')}
            />
          }
        />
      ) : (
        <AddNewWalletContainer>
          <h2>Add new wallet</h2>
          <Button
            icon="GoDiffAdded"
            size="3em"
            onClick={() => handleModal('create', 'open')}
          />
        </AddNewWalletContainer>
      )}
      {isModalOpen.create && (
        <AddWalletForm
          userId={userId}
          setWallet={setWallet}
          onClose={() => handleModal('create', 'close')}
        />
      )}
      {isModalOpen.update && wallet && (
        <UpdateWalletForm
          wallet={{ ...wallet, amount: String(wallet.amount) }}
          setWallet={setWallet}
          onClose={() => handleModal('update', 'close')}
        />
      )}
      {isModalOpen.deleteConfirm && wallet && (
        <ConfirmModal
          message="Are you sure you want to delete this wallet?"
          onConfirm={() => deleteWalletMutation(wallet.id)}
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

const AddNewWalletContainer = styled.div`
  height: 17em;
  width: 24em;
  border: 0.1em solid var(--primary);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: cursive;
`
