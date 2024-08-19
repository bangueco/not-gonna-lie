import { PageTitle } from "../types/page"

export default function NotFound({title}: PageTitle) {

  // Set page title
  document.title = title

  return (
    <div className="bg-background h-screen flex justify-center items-center">
      <h1 className="text-3xl text-text"><span className="text-red-600">Error 404:</span> Page Not Found</h1>
    </div>
  )
}