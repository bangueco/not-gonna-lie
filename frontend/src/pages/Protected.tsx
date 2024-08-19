import localStorage from '@/utils/localStorage'
import { Navigate, Outlet } from 'react-router-dom'

export default function Protected() {
  const user = localStorage.getItem('user')

  return user ? <Outlet /> : <Navigate to="/login" />
}