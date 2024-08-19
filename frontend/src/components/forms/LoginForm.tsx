import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Link } from "react-router-dom";
import { useState } from "react";
import localStorage from "@/utils/localStorage";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate()

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onPressLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        headers: {
          'Content-Type': 'application/json',
        },
        mode:'cors',
        method: "POST",
        body: JSON.stringify({username, password})
      })

      if (!response.ok) {
        const res = await response.json()

        return alert(res.message)
      }
      
      const user = await response.json()

      alert('Login successfully')
      navigate('/', {replace: true})
      return localStorage.createItem('user', JSON.stringify(user))
      
    } catch (error) {
      if (error instanceof Error) alert(error)
    }
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Sign in now to manage and see your confessions.</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input onChange={(e) => setUsername(e.target.value) } className="mt-2" id="username" name="username" />
        </div>
        <div className="mt-5">
          <Label htmlFor="Password">Password</Label>
          <Input onChange={(e) => setPassword(e.target.value)} className="mt-2" type="password" id="password" name="password" />
        </div>
        <div className="text-right w-full">
          <p className="text-sm p-1">Forgot password?</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="w-full text-center">
          <Button onClick={onPressLogin} variant="outline">Sign in</Button>
        </div>
        <div className="text-sm">
          <p>Don't have account yet? <Link className="hover:text-blue-300" to="/register">Register</Link> here</p>
        </div>
      </CardFooter>
    </Card>
  )
}