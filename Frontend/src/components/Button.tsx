import React, { FC } from 'react'
import styled from 'styled-components'

interface ButtonProps {
  text: string
  onClick: VoidFunction
}

const Button: FC<ButtonProps> = ({ text, onClick }) => (
  <StyledButton
    onClick={(e) => {
      e.preventDefault()
      onClick()
    }}
  >
    {text}
  </StyledButton>
)

const StyledButton = styled.button`
  background: var(--primary);
  height: 3.5em;
  color: white;
  padding: 1em;
  border-color: transparent;
  font-family: cursive;

  :hover {
    border-color: #ede1e6;
  }
`

export { Button }
