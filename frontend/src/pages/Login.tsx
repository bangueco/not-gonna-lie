import LoginForm from "@/components/forms/LoginForm"
import { PageTitle } from "../types/page"

export default function Login({title}: PageTitle) {

  // Set page title
  document.title = title

  return (
    <div className="bg-background text-text h-screen flex flex-col justify-center items-center">
      <LoginForm />
    </div>
  )
}