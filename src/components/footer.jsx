import * as React from "react"
//import Logo from "../icons/logo"
import {
  footerStyle,
  copyright,
  links,
  blurb,
  //logos,
  footerNavList,
  footerNavListItem,
} from "./footer.module.css"

export function Footer() {
  return (
    <footer className={footerStyle}>
      <div className={blurb}>
        {/*<div className={logos}>
          <Logo />
        </div>*/}
        Ikke nøl med å kontakt oss på e-post <strong>post@splosh.no</strong> dersom du har
        spørsmål eller trenger hjelp til å velge riktig produkt.
        Vi er tilgjengelige 24/7 og setter alltid pris på å høre fra deg :)
      </div>
      <nav className={links} aria-label="footer">
        <ul className={footerNavList}>
          <li className={footerNavListItem}>
            {/* <a href="https://github.com/gatsbyjs/gatsby-starter-shopify"> */}
              FRI FRAKT VED KJØP OVER 2000 NOK.
            {/* </a> */}
          </li>
          <li className={footerNavListItem}>
            {/* <a href="https://www.gatsbyjs.com/cloud/"> */}
              ÅPENT KJØP OG GRATIS RETUR INNEN 14 DAGER
            {/* </a> */}
          </li>
          {process.env.GATSBY_DEMO_STORE === "true" && (
            <li className={footerNavListItem}>
              {/* <a href="https://www.gatsbyjs.com/dashboard/deploynow?url=https://github.com/gatsbyjs/gatsby-starter-shopify&utm_campaign=shopify-starter">
                <img
                  src="https://www.gatsbyjs.com/deploynow.png"
                  alt="Deploy to Gatsby Cloud"
                  height="38"
                  width="251"
                />
              </a> */}
            </li>
          )}
        </ul>
      </nav>
      <div className={copyright}>
        Copyright &copy; {new Date().getFullYear()} · All rights reserved
      </div>
    </footer>
  )
}
