import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import NotFound from './pages/Not-Found'

import { ThemeProvider } from "@/components/theme-provider"
import Protected from './pages/Protected'
import { isAuthenticated } from './hooks/isAuthenticated'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' errorElement={<NotFound title='Page Not Found' />}>
      <Route element={<Protected />}>
        <Route index element={<Home title='Not Gonna Lie' />} />
      </Route>
      <Route path='login' element={<Login title='Login' />} loader={async () => await isAuthenticated()} />
      <Route path='register' element={<Register title='Register' />} loader={async () => await isAuthenticated()} />
    </Route>
  )
)

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  </ThemeProvider>
)
