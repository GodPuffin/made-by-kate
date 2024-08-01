"use client"

import { useFormState, useFormStatus } from "react-dom"
import { TextInput, Text, PasswordInput, Button } from '@mantine/core';
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import { signUp } from "@modules/account/actions"
import ErrorMessage from "@modules/checkout/components/error-message"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { IconConfetti, IconEyeCheck, IconEyeOff } from "@tabler/icons-react";

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(signUp, null)
  const { pending } = useFormStatus()

  return (
    <div className="max-w-sm flex flex-col items-center">
      <Text className="text-large-semi uppercase mb-6">
        Become a Made by Kate Store Member
      </Text>
      <Text className="text-center text-base-regular text-ui-fg-base mb-4">
        Create your Made by Kate Store profile, and get access to an enhanced
        shopping experience.
      </Text>
      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <TextInput
            label="First name"
            name="first_name"
            autoComplete="given-name"
          />
          <TextInput
            label="Last name"
            name="last_name"
            autoComplete="family-name"
          />
          <TextInput
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
          />
          <TextInput label="Phone" name="phone" type="tel" autoComplete="tel" />
          <PasswordInput
            label="Password"
            name="password"
            autoComplete="new-password"
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
        <span className="text-center text-ui-fg-base text-small-regular mt-6">
          By creating an account, you agree to Made by Kate Store&apos;s{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="underline"
          >
            Privacy Policy
          </LocalizedClientLink>{" "}
          and{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="underline"
          >
            Terms of Use
          </LocalizedClientLink>
          .
        </span>
        <Button
          fullWidth
          mt="lg"
          type="submit"
          loading={pending}
          variant="outline"
          rightSection={<IconConfetti size={20} />}
        >
          Join
        </Button>
      </form>
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        Already a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Sign in
        </button>
        .
      </span>
    </div>
  )
}

export default Register
