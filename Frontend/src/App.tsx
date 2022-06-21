import React, { Fragment } from 'react'
import { GlobalStyles } from './styles'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  HomePage,
  LoginPage,
  ClientsPage,
  ProfilePage,
  HelpPage
} from './pages'
import { Navbar } from './components'
import styled from 'styled-components'

const App = () => (
  <Fragment>
    <GlobalStyles />
    <BrowserRouter>
      <Navbar />
      <Content>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="help" element={<HelpPage />} />
        </Routes>
      </Content>
    </BrowserRouter>
  </Fragment>
)

const Content = styled.div`
  margin-top: 6.3em;
  margin-bottom: 6.3em;
  margin-left: 7.8em;
  margin-right: 7.8em;
`

export { App }
