import { Button } from "@/components/ui/button"
import { PageTitle } from "../types/page"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { AuthContext } from "@/components/AuthProvider"

export default function Home({title}: PageTitle) {


  // Set page title
  document.title = title

  const [confessions, setConfessions] = useState<Array<{id: number, confession: string, userId: number}>>()
  const auth = useContext(AuthContext)

  useEffect(() => {
    if (!auth) return
    fetch(`http://localhost:3000/api/confession/${auth.id}`)
      .then(response => response.json())
      .then(data => setConfessions(data))
      .catch(error => alert(error))
  })

  return (
    <div className="bg-background text-text h-screen flex flex-col justify-center items-center gap-3">
      <div className="bg-primary-foreground p-3 rounded-lg flex flex-row items-center justify-between w-[50%]">
        <div>
          <p className="text-xl font-bold">Justine Ivan Gueco</p>
          <p className="text-gray-500">{auth?.username}</p>
          <Button className="mt-5" variant="secondary">Edit Profile</Button>
        </div>
        <div>
          <img className="rounded-full" width={100} src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small_2x/default-avatar-icon-of-social-media-user-vector.jpg" alt="profile" />
        </div>
      </div>
      <div className="bg-primary-foreground p-2 rounded-lg flex flex-col gap-5 items-center w-[50%] h-[60%] overflow-scroll">
        <h1 className="text-5xl">Confessions</h1>
        <div className="w-[100%] flex gap-2 flex-col">
          {
            confessions && confessions.map(confession => (
              <div key={confession.id} className="flex flex-col-reverse bg-primary-foreground border-2 justify-between items-start p-3 rounded-md">
                <p>{confession.confession}</p>
                <p className="text-xs italic text-stone-700">09/26/2024</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}