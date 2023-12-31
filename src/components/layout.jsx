import * as React from "react"
import { SkipNavContent, SkipNavLink } from "./skip-nav"
import { Header } from "./header"
import { Footer } from "./footer"

export function Layout({ children }) {
  return (
    <>
      <SkipNavLink />
      <Header />
      <SkipNavContent>{children}</SkipNavContent>
      <Footer />
    </>
  )
}
