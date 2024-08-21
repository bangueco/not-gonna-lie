import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Button } from "../ui/button"

type Target = {
  target: number
}

export default function ConfessionForm({target}: Target) {

  const [confession, setConfession] = useState<string>('')

  const sendConfession = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    
    const response = await fetch('http://localhost:3000/api/confession', {
      method: "POST",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({confession, userId: target})
    })

    if (!response.ok) {
      const parsedResponse = await response.json()
      return alert(parsedResponse.message)
    }

    alert('Sent successfully')

    return location.reload()
  }

  return (
    <form onSubmit={sendConfession} method="POST" className="w-full flex items-center justify-center gap-3">
      <div className="flex-1">
        <Input onChange={(e) => setConfession(e.target.value)} className="mt-2 bg-primary-foreground" id="confession" name="confession" />
      </div>
      <div className="h-full flex items-end">
        <Button>Send</Button>
      </div>
    </form>
  )
}