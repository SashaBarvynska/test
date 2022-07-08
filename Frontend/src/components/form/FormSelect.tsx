import React, { ChangeEvent, ChangeEventHandler, FC, useState } from 'react'
import styled, { ThemedStyledProps } from 'styled-components'

interface FormSelectProps {
  options: Option[]
  name: string
  onChange: ChangeEventHandler<HTMLSelectElement>
  title?: string
  defaultValue?: string
  errorMessage?: string
}

export interface Option {
  value: string
  title: string
}

const FormSelect: FC<FormSelectProps> = ({
  options,
  name,
  onChange,
  errorMessage,
  defaultValue = 'Select an option...',
  title = 'Select title'
}) => {
  const [hideDropdown, setHideDropdown] = useState<boolean>(true)
  const [mouseOverDropdown, setMouseOverDropdown] = useState<boolean>(false)
  const [selectedTitle, setSelectedTitle] = useState<string>(defaultValue)

  const handleSelect = ({ title, value }: Option) => {
    setSelectedTitle(title)
    setHideDropdown(true)
    onChange({
      target: { name, value }
    } as ChangeEvent<HTMLSelectElement>)
  }

  const handleBlur = () => {
    if (!mouseOverDropdown) {
      setHideDropdown(true)
    }
  }

  return (
    <>
      <Title>{title}</Title>
      <Select
        tabIndex={0}
        onClick={() => setHideDropdown(!hideDropdown)}
        onBlur={handleBlur}
      >
        {selectedTitle}
      </Select>
      <OptionsGroup
        hidden={hideDropdown}
        onMouseEnter={() => setMouseOverDropdown(true)}
        onMouseLeave={() => setMouseOverDropdown(false)}
      >
        {options.map((option, index) => (
          <Option key={index} onClick={() => handleSelect(option)}>
            {option.title}
          </Option>
        ))}
      </OptionsGroup>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </>
  )
}

const Title = styled.p`
  font-family: cursive;
  margin-bottom: 0.7em;
  font-weight: bold;
`

const Select = styled.div`
  height: 3em;
  font-family: cursive;
  padding-left: 1em;
  font-size: 0.9em;
  border: 0.05em solid #767676;
  display: flex;
  align-items: center;
  border-radius: 0.2em;
  cursor: pointer;
`

const OptionsGroup = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  border: 0.05em solid #767676;
  max-height: 11em;
  overflow-x: overlay;
  display: ${(props) => (props.hidden ? 'none' : 'block')};
`

const Option = styled.li`
  height: 3em;
  font-family: cursive;
  font-size: 0.9em;
  display: flex;
  align-items: center;
  padding-left: 1em;

  :hover {
    color: var(--white);
    background: var(--hover);
  }
`

const ErrorMessage = styled.p`
  margin-top: 0.3em;
  color: red;
  font-family: cursive;
`

export { FormSelect }
