import React, { FC, ChangeEventHandler } from 'react'
import styled from 'styled-components'

interface FormInputProps {
  value: string
  name: string
  onChange: ChangeEventHandler<HTMLInputElement>
  type?: 'string' | 'number'
  title?: string
  placeholder?: string
  errorMessage?: string
}

const FormInput: FC<FormInputProps> = ({
  value,
  name,
  onChange,
  type = 'string',
  title = 'Input title',
  placeholder = 'Placeholder...',
  errorMessage
}) => (
  <>
    <Title>{title}</Title>
    <StyledInput
      value={value}
      name={name}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
    />
    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
  </>
)

const StyledInput = styled.input`
  height: 3em;
  margin-bottom: 0.5em;
  font-family: cursive;
  padding-left: 1em;
  font-size: 0.9em;
`

const Title = styled.p`
  font-family: cursive;
  margin-bottom: 0.7em;
  font-weight: bold;
`

const ErrorMessage = styled.p`
  margin-top: 0.3em;
  color: red;
  font-family: cursive;
`

export { FormInput }
