import { useFormState, useFormStatus } from "react-dom"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import { TextInput, Text, PasswordInput, Button } from '@mantine/core';
import { logCustomerIn } from "@modules/account/actions"
import ErrorMessage from "@modules/checkout/components/error-message"
import { IconEyeCheck, IconEyeOff, IconWritingSign } from "@tabler/icons-react";

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(logCustomerIn, null)
  const { pending } = useFormStatus()

  return (
    <div className="max-w-sm w-full flex flex-col items-center">
      <Text className="text-large-semi uppercase mb-6">Welcome back</Text>
      <Text className="text-center text-base-regular mb-8">
        Sign in to access your information & track orders.
      </Text>
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <TextInput
            label="Email"
            name="email"
            type="email"
            placeholder="Enter a valid email address."
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
      <span className="text-center text-small-regular mt-6">
        Not a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline"
        >
          Join us
        </button>
        .
      </span>
    </div>
  )
}

export default Login
