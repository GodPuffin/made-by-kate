import { Metadata } from "next"
import ForgotPasswordTemplate from "@modules/account/templates/forgot-password-template"

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your password",
}

export default function ForgotPassword() {
  return <ForgotPasswordTemplate />
} 