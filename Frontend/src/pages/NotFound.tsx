import React from 'react'
import styled from 'styled-components'

const NotFound = () => (
  <Container>
    <h1>404</h1>
    <h2>Not Found</h2>
  </Container>
)

export { NotFound }

const Container = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  font-family: cursive;
  align-items: center;
  font-size: 1.5em;
`
