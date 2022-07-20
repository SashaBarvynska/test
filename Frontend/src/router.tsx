import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Users, UserProfile, Pets, PetProfile, NotFound } from './pages'
import { Navbar } from './components'
import styled from 'styled-components'

const Router = () => (
  <BrowserRouter>
    <Navbar />
    <Content>
      <Routes>
        <Route path="/" element={<Navigate to="users" />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:userId" element={<UserProfile />} />
        <Route path="pets" element={<Pets />} />
        <Route path="pets/:petId" element={<PetProfile />} />
        <Route path="users/:userId/adopt-pet" element={<Pets isAdopt />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Content>
  </BrowserRouter>
)

const Content = styled.div`
  margin-top: 3em;
  margin-bottom: 6.3em;
  margin-left: 7.8em;
  margin-right: 7.8em;
`

export { Router }
