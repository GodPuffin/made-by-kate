"use client"

import { useState } from "react"
import { Container, Title, Text, PasswordInput, Button, Paper, Alert, MantineProvider } from "@mantine/core"
import { IconCheck, IconX, IconEyeCheck, IconEyeOff } from "@tabler/icons-react"
import { useForm } from "@mantine/form"
import { useSearchParams, useRouter } from "next/navigation"
import { medusaClient } from "@lib/config"

export default function ResetPasswordTemplate() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()

  const token = searchParams.get("token")
  const email = searchParams.get("email")

  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: {
      password: (value) => (value.length < 8 ? "Password must be at least 8 characters" : null),
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  })

  const handleSubmit = async (values: { password: string }) => {
    setLoading(true)
    setError(null)

    if (!token || !email) {
      setError("Invalid reset link")
      setLoading(false)
      return
    }

    try {
      await medusaClient.customers.resetPassword({
        email,
        password: values.password,
        token,
      })
      
      router.push("/account/login")
    } catch (err) {
      setError("Unable to reset password. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!token && !email) {
    return (
      <MantineProvider>
        <Container size="xs" mt={50}>
          <Alert icon={<IconX size={16} />} color="red">
            Invalid reset link. Please request a new password reset.
          </Alert>
        </Container>
      </MantineProvider>
    )
  }

  return (
    <MantineProvider>
      <Container size="xs" mt={50}>
        <Paper component="div" radius="md" p="xl" withBorder>
          <Title order={2} mb="md">Reset your password</Title>
          <Text component="p" color="dimmed" size="sm" mb="lg">
            Enter your new password below
          </Text>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <PasswordInput
              required
              label="New Password"
              placeholder="Enter your new password"
              {...form.getInputProps("password")}
              mb="md"
              visibilityToggleIcon={({ reveal }) =>
                reveal ? (
                  <IconEyeOff style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
                ) : (
                  <IconEyeCheck style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
                )
              }
            />

            <PasswordInput
              required
              label="Confirm Password"
              placeholder="Confirm your new password"
              {...form.getInputProps("confirmPassword")}
              mb="md"
              visibilityToggleIcon={({ reveal }) =>
                reveal ? (
                  <IconEyeOff style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
                ) : (
                  <IconEyeCheck style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
                )
              }
            />

            {error && (
              <Alert icon={<IconX size={16} />} color="red" mb="md">
                {error}
              </Alert>
            )}

            <Button
              component="button"
              type="submit"
              fullWidth
              loading={loading}
            >
              Reset Password
            </Button>
          </form>
        </Paper>
      </Container>
    </MantineProvider>
  )
} 