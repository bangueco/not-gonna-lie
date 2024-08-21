import { UserToken } from "@/types/user";
import { createContext, ReactNode, useEffect, useState } from "react";

export const AuthContext = createContext<UserToken | null>(null)

type AuthProps = {
  children: ReactNode
}

export default function AuthProvider({children}: AuthProps) {
  const [auth, setAuth] = useState<UserToken>()

  useEffect(() => {
    const user = localStorage.getItem('user')

    if (!user) {
      return
    }
    
    const parsedUser: UserToken = JSON.parse(user)
    setAuth(parsedUser)
  }, [])

  return (
    auth 
    ? <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
    : <div>{children}</div>
  )
}