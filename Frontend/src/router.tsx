import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { Members, Pets } from './pages'
import { Navbar } from './components'
import styled from 'styled-components'

const Router = () => (
  <BrowserRouter>
    <Navbar />
    <Content>
      <Routes>
        <Route path="/" element={<Navigate to="members" />} />
        <Route path="members" element={<Members />} />
        <Route path="pets" element={<Pets />} />
      </Routes>
    </Content>
  </BrowserRouter>
)

const Content = styled.div`
  margin-top: 6.3em;
  margin-bottom: 6.3em;
  margin-left: 7.8em;
  margin-right: 7.8em;
`

export { Router }
