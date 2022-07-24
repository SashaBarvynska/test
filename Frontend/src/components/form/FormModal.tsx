import React, { FC, ReactElement } from 'react'
import styled from 'styled-components'

import { Button } from '../Button'
import { FormInputProps } from './FormInput'
import { FormSelectProps } from './FormSelect'

type FormChild = ReactElement<FormInputProps | FormSelectProps>

interface ModalFormProps {
  onSubmit: VoidFunction
  onClose: VoidFunction
  title?: string
  children?: FormChild | FormChild[]
}

export const FormModal: FC<ModalFormProps> = ({
  onSubmit,
  onClose,
  title = 'Form title',
  children
}) => {
  return (
    <Container>
      <FormBackground />
      <Form>
        <FormTitle>{title}</FormTitle>
        {children}
        <FormButtons>
          <Button text="Close" onClick={onClose} />
          <Button text="Submit" onClick={onSubmit} />
        </FormButtons>
      </Form>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  overflow: auto;
`

const FormBackground = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  background: #ede1e6;
  opacity: 0.6;
  position: fixed;
  left: 0;
  top: 0;
`

const Form = styled.form`
  min-width: 30em;
  min-height: 15em;
  margin: auto;
  margin-top: 1em;
  background: white;
  z-index: 1;
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

const FormTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 1.5em;
  font-family: cursive;
`
