import ConfessionForm from "@/components/forms/ConfessionForm"
import { PageTitle } from "../types/page"
import { useLoaderData, LoaderFunction } from "react-router-typesafe"
import { useContext } from "react"
import { AuthContext } from "@/components/AuthProvider"

export const loader = (async (e) => {
  const userResponse = await fetch(`http://localhost:3000/api/user/${e.params.username}`)
  const {id, fullname, username} = await userResponse.json()

  const confessions = await fetch(`http://localhost:3000/api/confession/${id}`)
  const parsedConfessions: Array<{id: string, confession: string, userId: number, submittedAt: string}> = await confessions.json()
  if (!userResponse.ok) return
            
  return {id, fullname, username, parsedConfessions}
}) satisfies LoaderFunction

export default function User({title}: PageTitle) {

  // Set page title
  document.title = title

  const auth = useContext(AuthContext)
  const data = useLoaderData<typeof loader>();

  return (
    <div className="bg-background text-text h-screen flex flex-col justify-center items-center gap-3">
      <div className="bg-primary-foreground p-3 rounded-lg flex flex-row items-center justify-between w-[50%]">
        <div>
          <p className="text-xl font-bold">{data?.fullname}</p>
          <p className="text-gray-500">@{data?.username}</p>
        </div>
        <div>
          <img className="rounded-full" width={100} src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small_2x/default-avatar-icon-of-social-media-user-vector.jpg" alt="profile" />
        </div>
      </div>
      <div className="bg-primary-foreground p-2 rounded-lg flex flex-col gap-5 items-center w-[50%] h-[60%] overflow-scroll">
        <h1 className="text-5xl">Confessions</h1>
        {
          auth?.id === data?.id ? null : <ConfessionForm target={data?.id} />
        }
        <div className="w-[100%] flex gap-2 flex-col">
          {
            data?.parsedConfessions && data.parsedConfessions.map(confession => (
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