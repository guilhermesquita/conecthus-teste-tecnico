import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './commons/hooks/useAuth'
import { SnackbarProvider } from './commons/hooks/useSnackbar'
import './styles/global.css'
import { AppRoutes } from './routes'

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <SnackbarProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </SnackbarProvider>
    </AuthProvider>
  )
}
