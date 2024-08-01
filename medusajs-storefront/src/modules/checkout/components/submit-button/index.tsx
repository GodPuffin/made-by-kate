"use client"

import { Button } from "@mantine/core"
import React from "react"
import { useFormStatus } from "react-dom"

export function SubmitButton({
  children,
  variant = "primary",
  className,
}: {
  children: React.ReactNode
  variant?: string
  className?: string
}) {
  const { pending } = useFormStatus()

  return (
    <Button
      className={className}
      type="submit"
      loading={pending}
      variant={variant}
    >
      {children}
    </Button>
  )
}
