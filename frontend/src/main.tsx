import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Login from './pages/Login'
import Home from './pages/Home'
import User from './pages/User'
import Register from './pages/Register'
import NotFound from './pages/Not-Found'

import { loader as homeLoader } from './pages/Home'
import { loader as userLoader } from './pages/User'

import { ThemeProvider } from "@/components/theme-provider"
import Protected from './pages/Protected'
import { isAuthenticated } from './hooks/isAuthenticated'
import AuthProvider from './components/AuthProvider'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' errorElement={<NotFound title='Page Not Found' />}>
      <Route element={<Protected />}>
        <Route index element={<Home title='Not Gonna Lie' />} loader={async () => homeLoader()} />
        <Route path="/user/:username" element={<User title='Not Gonna Lie' />} loader={(e) => userLoader(e) } />
      </Route>
      <Route path='login' element={<Login title='Login' />} loader={async () => await isAuthenticated()} />
      <Route path='register' element={<Register title='Register' />} loader={async () => await isAuthenticated()} />
    </Route>
  )
)

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
    <AuthProvider>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </AuthProvider>
  </ThemeProvider>
)
