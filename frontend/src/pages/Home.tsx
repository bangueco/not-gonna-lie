import { Button } from "@/components/ui/button"
import { PageTitle } from "../types/page"
import { useContext } from "react"
import { AuthContext } from "@/components/AuthProvider"

import { useLoaderData, LoaderFunction } from "react-router-typesafe"
import localStorage from "@/utils/localStorage"
import { UserToken } from "@/types/user"

export const loader = (async () => {
  const auth = localStorage.getItem('user')

  if (!auth) return
  const parsedUser: UserToken = JSON.parse(auth)
  const confessions = await fetch(`http://localhost:3000/api/confession/${parsedUser.id}`)
  const parsedConfessions: Array<{id: string, confession: string, userId: number, submittedAt: string}> = await confessions.json()

  return parsedConfessions
            
}) satisfies LoaderFunction

const logout = () => {
  localStorage.deleteItem('user')

  return location.href = '/login'
}

export default function Home({title}: PageTitle) {


  // Set page title
  document.title = title

  const auth = useContext(AuthContext)
  const data = useLoaderData<typeof loader>()

  return (
    <div className="bg-background text-text h-screen flex flex-col justify-center items-center gap-3">
      <div className="bg-primary-foreground p-3 rounded-lg flex flex-row items-center justify-between w-[50%]">
        <div>
          <p className="text-xl font-bold">{auth?.fullname}</p>
          <p className="text-gray-500">@{auth?.username}</p>
          <div className="flex gap-2">
            <Button className="mt-5" variant="secondary">Edit Profile</Button>
            <Button onClick={logout} className="mt-5" variant="secondary">Logout</Button>
          </div>
        </div>
        <div>
          <img className="rounded-full" width={100} src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small_2x/default-avatar-icon-of-social-media-user-vector.jpg" alt="profile" />
        </div>
      </div>
      <div className="bg-primary-foreground p-2 rounded-lg flex flex-col gap-5 items-center w-[50%] h-[60%] overflow-scroll">
        <h1 className="text-5xl">Confessions</h1>
        <div className="w-[100%] flex gap-2 flex-col">
          {
            data && data.map(confession => (
              <div key={confession.id} className="flex flex-col-reverse bg-primary-foreground border-2 justify-between items-start p-3 rounded-md">
                <p>{confession.confession}</p>
                <p className="text-xs italic text-stone-700">{confession.submittedAt}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}