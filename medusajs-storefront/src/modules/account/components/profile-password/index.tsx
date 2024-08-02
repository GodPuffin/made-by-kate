"use client"

import { Customer } from "@medusajs/medusa"
import React, { useEffect } from "react"

import AccountInfo from "../account-info"
import { updateCustomerPassword } from "@modules/account/actions"
import { useFormState } from "react-dom"
import { PasswordInput } from "@mantine/core"

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">
}

const ProfileName: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false)

  const [state, formAction] = useFormState(updateCustomerPassword, {
    customer,
    success: false,
    error: false,
  })

  const clearState = () => {
    setSuccessState(false)
  }

  useEffect(() => {
    setSuccessState(state.success)
  }, [state])

  return (
    <form action={formAction} onReset={() => clearState()} className="w-full">
      <AccountInfo
        label="Password"
        currentInfo={
          <span>The password is not shown for security reasons</span>
        }
        isSuccess={successState}
        isError={!!state.error}
        errorMessage={state.error}
        clearState={clearState}
      >
        <div className="grid grid-cols-2 gap-4">
          <PasswordInput
            label="Old password"
            name="old_password"
            required
          />
          <PasswordInput
            label="New password"
            name="new_password"
            required
          />
          <PasswordInput
            label="Confirm password"
            name="confirm_password"
            required
          />
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileName
