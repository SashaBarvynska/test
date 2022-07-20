import React, { FC } from 'react'
import styled from 'styled-components'

export interface TextButtonProps {
  text?: string
  onClick?: VoidFunction
}

export const TextButton: FC<TextButtonProps> = ({ text, onClick }) => (
  <StyledButton onClick={onClick}>{text}</StyledButton>
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
