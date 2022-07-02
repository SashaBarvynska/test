import React, { FC, ReactNode } from 'react'
import styled from 'styled-components'
import { Button } from './Button'

interface ModalFormProps {
  onConfirm: VoidFunction
  onClose: VoidFunction
  message: string
}

const ConfirmModal: FC<ModalFormProps> = ({ onConfirm, onClose, message }) => {
  return (
    <Container>
      <ModalBackground />
      <Modal>
        <ModalMessage>{message}</ModalMessage>
        <FormButtons>
          <Button text="Close" onClick={onClose} />
          <Button text="Confirm" onClick={onConfirm} />
        </FormButtons>
      </Modal>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  z-index: 5;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  overflow: auto;
`

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  z-index: 6;
  background: #ede1e6;
  opacity: 0.6;
  position: fixed;
  left: 0;
  top: 0;
`

const Modal = styled.div`
  min-width: 20em;
  min-height: 10em;
  margin: auto;
  margin-top: 5em;
  background: white;
  z-index: 7;
  padding: 2.5em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const FormButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2.5em;
`

const ModalMessage = styled.h3`
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  font-family: cursive;
`

export { ConfirmModal }
