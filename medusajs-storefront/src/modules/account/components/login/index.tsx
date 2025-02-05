import { useFormState, useFormStatus } from "react-dom"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import { TextInput, Text, PasswordInput, Button, Modal } from '@mantine/core';
import { logCustomerIn } from "@modules/account/actions"
import ErrorMessage from "@modules/checkout/components/error-message"
import { IconEyeCheck, IconEyeOff, IconWritingSign } from "@tabler/icons-react"
import { useDisclosure } from '@mantine/hooks'
import { useState } from "react"
import { medusaClient } from "@lib/config"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(logCustomerIn, null)
  const { pending } = useFormStatus()
  const [opened, { open, close }] = useDisclosure(false)
  const [resetEmail, setResetEmail] = useState("")
  const [resetStatus, setResetStatus] = useState<{
    type: "success" | "error" | null,
    message: string | null
  }>({ type: null, message: null })

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await medusaClient.customers.generatePasswordToken({
        email: resetEmail
      })

      setResetStatus({
        type: "success",
        message: "If an account exists with that email, a reset link will be sent to it."
      })
      setResetEmail("")
    } catch (error) {
      console.error("Password reset error:", error)
      setResetStatus({
        type: "error",
        message: "Something went wrong. Please try again."
      })
    }
  }

  return (
    <div className="max-w-sm w-full flex flex-col items-center">
      <Text className="text-center text-base-regular mb-8">
        Welcome Back!
      </Text>
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <TextInput
            label="Email"
            name="email"
            type="email"
          />
          <PasswordInput
            label="Password"
            name="password"
            visibilityToggleIcon={({ reveal }) =>
              reveal ? (
                <IconEyeOff style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
              ) : (
                <IconEyeCheck style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
              )
            }
          />
        </div>
        <span className="text-center text-small-regular mt-6">
          <button
            onClick={(e) => {
              e.preventDefault()
              open()
            }}
            className="mt-2 p-0 underline"
          >
            Forgot password?
          </button>
        </span>
        <ErrorMessage error={message} />
        <Button
          fullWidth
          mt="lg"
          variant="outline"
          rightSection={<IconWritingSign size={20}/>}
          loading={pending}
          type="submit"
        >
          Sign in
        </Button>
      </form>
      <div className="flex flex-col items-center mt-4">
        <span className="text-gray-700 text-small-regular">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
            className="underline"
          >
            Sign up
          </button>
        </span>
      </div>

      <Modal 
        opened={opened} 
        onClose={() => {
          close()
          setResetStatus({ type: null, message: null })
          setResetEmail("")
        }}
        title="Reset Password"
        centered
      >
        <form onSubmit={handleResetPassword}>
          <Text size="sm" mb="md">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </Text>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            required
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            mb="md"
          />
          {resetStatus.message && (
            <Text 
              color={resetStatus.type === "success" ? "green" : "red"} 
              size="sm" 
              mb="md"
            >
              {resetStatus.message}
            </Text>
          )}
          <Button
            fullWidth
            type="submit"
            variant="filled"
          >
            Send Reset Link
          </Button>
        </form>
      </Modal>
    </div>
  )
}

export default Login
