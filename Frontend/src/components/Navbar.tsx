import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Navbar: FC = () => (
  <Container>
    <TabContainer>
      <Tab to="/">Home</Tab>
      <Tab to="login">Login</Tab>
      <Tab to="clients">Clients</Tab>
      <Tab to="profile">Profile</Tab>
      <Tab to="help">Help</Tab>
    </TabContainer>
  </Container>
)

const Container = styled.div`
  background: var(--primary);
  height: 4em;
`

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  width: 40%;
  height: 100%;
  margin-left: 15%;
`

const Tab = styled(Link)`
  color: white;
  text-transform: uppercase;
  font-family: cursive;
  flex-basis: 0;
  flex-grow: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    color: blue;
  }
`

export { Navbar }
