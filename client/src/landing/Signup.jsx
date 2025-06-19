import { SignupForm } from "../../components/ui/SignupForm"

export default function Signup() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-[20px]">
      <div className="w-[400px] max-w-sm md:max-w-3xl">
        <SignupForm />
      </div>
    </div>
  )
}
