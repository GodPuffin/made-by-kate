import React from "react"

import Nav from "@modules/layout/templates/nav"

const Layout: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <div>
      <Nav>
      <main className="relative">{children}</main>
      </Nav>
    </div>
  )
}

export default Layout
