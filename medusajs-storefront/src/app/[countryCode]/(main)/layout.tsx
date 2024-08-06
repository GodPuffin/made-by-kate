import { Metadata } from "next"

import Nav from "@modules/layout/templates/nav"
import { listRegions } from "@lib/data"
import { retrieveCart } from "@modules/cart/actions"
import { Cart } from "@medusajs/medusa"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  const regions = await listRegions().then((regions) => regions)
  const cart = await retrieveCart() as Cart | null

  return (
    <Nav regions={regions} cart={cart}>
      {props.children}
    </Nav>
  )
}
