import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { GlobalStyles } from './styles'
import { Router } from './router'

const client = new QueryClient()

const App = () => (
  <QueryClientProvider client={client}>
    <GlobalStyles />
    <Router />
  </QueryClientProvider>
)

export { App }
