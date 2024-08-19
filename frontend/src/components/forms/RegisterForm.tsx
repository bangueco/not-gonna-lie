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

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RegisterForm() {
  const navigate = useNavigate()
  
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onPressRegister = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
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

      alert('Registered successfully!')

      return navigate('/login')
      
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Sign up</CardTitle>
        <CardDescription>Sign up now to receive anonymous confessions!</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input onChange={(e) => setUsername(e.target.value)} className="mt-2" id="username" name="username" />
        </div>
        <div className="mt-5">
          <Label htmlFor="Password">Password</Label>
          <Input onChange={(e) => setPassword(e.target.value)} className="mt-2" type="password" id="password" name="password" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="w-full text-center">
          <Button onClick={onPressRegister} variant="outline">Sign up</Button>
        </div>
        <div className="text-sm">
          <p>Already have account yet? <Link className="hover:text-blue-300" to="/login">Login</Link> here</p>
        </div>
      </CardFooter>
    </Card>
  )
}