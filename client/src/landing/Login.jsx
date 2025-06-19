import { LoginForm } from "../../components/ui/LoginForm"

export default function Login() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-5">
      <div className="w-[400px] max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  )
}
