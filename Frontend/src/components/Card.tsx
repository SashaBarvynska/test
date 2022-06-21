import React, { FC, ReactElement } from 'react'
import styled from 'styled-components'

interface CardProps {
  children: string | ReactElement
  className?: string
}

const Card: FC<CardProps> = ({ className, children }) => (
  <Container className={className}>{children}</Container>
)

const Container = styled.div`
  background: white;
  max-width: 30em;
  padding: 2.5em;
  font-family: cursive;
  border-radius: 0.3em;
  box-shadow: 0.1em 0.1em 0.5em 0.01em;
`

export { Card }
