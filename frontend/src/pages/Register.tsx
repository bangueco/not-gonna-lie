import RegisterForm from "@/components/forms/RegisterForm"
import { PageTitle } from "../types/page"

export default function Register({title}: PageTitle) {

  // Set page title
  document.title = title

  return (
    <div className="bg-background text-text h-screen flex flex-col justify-center items-center">
      <RegisterForm />
    </div>
  )
}