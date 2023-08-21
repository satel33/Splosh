import React, { useState } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import { Slant as Hamburger } from "hamburger-react"

import NavDropdown from "./nav-dropdown"
import { Toast } from "./toast"
import { StoreContext } from "../context/store-context"
import Logo from "../icons/logo"
import { CartButton } from "./cart-button"
import SearchIcon from "../icons/search"
import { screen } from "../constants/screen"
import { DropdownIcon } from "../icons/dropdown"
import { logo as logoCss, searchButton } from "./header.module.css"

export function Header() {
  const {
    allShopifyProduct: { products },
    catalogs,
  } = useStaticQuery(graphql`
    {
      allShopifyProduct {
        products: nodes {
          title
          metafields {
            value
          }
          productType
          tags
        }
      }
      catalogs: allShopifyProduct(filter: { tags: { eq: "CatalogAssets" } }) {
        nodes {
          title
          metafields {
            value
          }
          productType
        }
      }
    }
  `)

  const { checkout, loading, didJustAddToCart } = React.useContext(StoreContext)
  const [hambugerActive, setHambugerActive] = useState(false)
  const [dropdownShow, setDropdownShow] = useState(false)
  const [navMenuShow, setNavMenuShow] = useState({})

  const items = checkout ? checkout.lineItems : []
  const quantity = items.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  function removeValue(value, index, arr) {
    if (value.tags.includes("CatalogAssets")) {
      arr.splice(index, 1)
      return false
    }
    return true
  }

  const map = new Map()
  let uniqueProducts = products.filter((product) => {
    if (map.get(product.productType)) {
      return false
    }
    map.set(product.productType, product)
    return true
  })

  const dropdownHandler = (navItem) => {
    setNavMenuShow({
      ...navMenuShow,
      [navItem]: !navMenuShow[navItem],
    })
  }

  let navMenuClsName = "navbar-main desktop"
  if (hambugerActive) {
    navMenuClsName += " active"
  }

  return (
    <>
      <header className="header">
        <div className="layout-container">
          <nav
            className={`header-nav ${
              (dropdownShow || hambugerActive) && "show"
            }`}
          >
            <ul className={navMenuClsName}>
              <li>
                <Link to="/" >
                  <Logo />
                </Link>
              </li>
              <li
                className={`nav-item dropdown ${
                  navMenuShow["catalog"] && "show"
                }`}
                role="presentation"
                onMouseEnter={() => {
                  setDropdownShow(true)
                }}
                onMouseLeave={() => {
                  setDropdownShow(false)
                }}
              >
                <button
                  // href="#catalog"
                  className="nav-link"
                  onClick={() => dropdownHandler("catalog")}
                >
                  Teknisk rigg
                  <DropdownIcon rotate={navMenuShow["catalog"]} />
                </button>
                <NavDropdown products={catalogs.nodes} />
              </li>
              <li
                className={`nav-item dropdown ${
                  navMenuShow["product"] && "show"
                }`}
                role="presentation"
                onMouseEnter={() => {
                  setDropdownShow(true)
                }}
                onMouseLeave={() => {
                  setDropdownShow(false)
                }}
              >
                <button
                  className="nav-link"
                  onClick={() => dropdownHandler("product")}
                >
                  PVC Rør & koblinger
                  <DropdownIcon rotate={navMenuShow["product"]} />
                </button>
                <NavDropdown products={uniqueProducts.filter(removeValue)} />
              </li>
              <li
                className={`nav-item dropdown ${
                  navMenuShow["about"] && "show"
                }`}
              >
                <a
                  href="/about"
                  className="nav-link"
                >
                  Om Splosh💦
                </a>
              </li>
            </ul>
            <Hamburger
              toggled={hambugerActive}
              toggle={setHambugerActive}
              color="#FFF"
              size="20"
            />
            <div className="nav-actions">
              <Link to="/search" className={searchButton}>
                <SearchIcon />
              </Link>
              <CartButton quantity={quantity} />
            </div>
          </nav>
        </div>
        <style jsx global>{`
          .header {
            display: flex;
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 100;
            -webkit-backdrop-filter: blur(8px);
            backdrop-filter: blur(8px);
            background-color: rgba(0, 0, 0, 0.6);
            box-shadow: 1px 1px 10px 0 rgba(0, 0, 0, 0.05);
          }

          .header-nav {
            position: relative;
            height: 70px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .layout-container {
            margin: 0 auto 0 18px;
            width: 100%;
            padding: 0 var(--size-gutter);
            position: relative;
          }

          .navbar-main {
            height: 100%;
            display: flex;
            align-items: center;
            padding: 0;
            margin: 0;
            list-style: none;
          }

          .navbar-main.active {
            padding: 40px 24px;
            display: flex;
            position: absolute;
            background: white;
            top: 70px;
            left: 0px;
            width: 100%;
            height: calc(100vh - 100px);
            box-sizing: border-box;
            background: #22272a;
            backdrop-filter: blur(10px);
            flex-direction: column;
            overflow: hidden;
          }

          .nav-link {
            position: relative;
            height: 70px;
            display: flex;
            align-items: center;
            padding: 0 12px;
            font-weight: 400;
            font-size: 1.0rem;
            line-height: 20px;
            color: #b3b3b3;
            margin-left: 10px;
          }

          .nav-link:hover {
            color: white;
          }

          .nav-link:before,
          .nav-link:after {
            content: "";
            position: absolute;
            top: auto;
            bottom: 0;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
          }

          .nav-item:hover .nav-link:before,
          .nav-item:hover .nav-link:after {
            border-style: solid;
            border-width: 0 10px 12px 10px;
            border-color: transparent transparent #22272a transparent;
            transform: rotate(0deg);
            opacity: 1;
          }

          //.nav-link:before {
          //  right: 50%;
          //}
          //
          //.nav-link:after {
          //  left: 50%;
          //}

          .nav-item {
            width: auto;
            display: flex;
            align-items: center;
            text-align: center;
            justify-content: center;
          }

          .nav-item:hover {
            opacity: 1;
            color: #fff;
            transition: all 0.15s ease-in;
          }

          .dropdown {
            position: relative;
          }

          .dropdown-content {
            display: none;
            position: absolute;
            width: 250px;
            top: 100%;
            left: 0px;
            z-index: 1;
          }

          .hamburger-react {
            display: none;
            padding: 0;
            right: -16px;
            cursor: pointer;
          }

          .nav-actions {
            display: flex;
            align-items: center;
          }

          @media (min-width: ${screen.tabletMax}px) {
            .dropdown:hover .dropdown-content {
              display: block;
            }
          }

          @media (max-width: ${screen.desktop}px) {
            .layout-container {
              width: calc(100vw - 80px);
              max-width: 1280px;
            }
          }

          @media (max-width: ${screen.tabletMax}px) {
            .layout-container {
              width: 100%;
              height: ${hambugerActive && "100vh !important"};
              margin: 0 40px;
            }

            .hamburger {
              display: block;
            }

            .navbar-main {
              display: none;
            }

            .navbar-main.active {
              overflow: auto;
            }

            .dropdown.show .dropdown-content {
              display: block;
            }

            .nav-item {
              position: relative;
              height: auto;
              width: 100%;
              display: flex;
              flex-direction: column;
            }

            .nav-link {
              box-sizing: border-box;
              width: 100%;
              padding: 20px 8px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-size: 24px;
              line-height: 32px;
              opacity: 1;
              text-align: left;
            }

            .nav-link:hover {
              background: none;
              border: none;
            }

            .dropdown-content {
              position: relative;
              top: 0;
              background: transparent;
              backdrop-filter: none;
              width: 100%;
            }
          }

          @media (max-width: ${screen.mobileExtraSmall}px) {
            .layout-container {
              margin: 0 12px;
            }

            .header-nav {
              padding: 0 24px;
            }

            .navbar-main.active {
              padding: 24px;
            }

            .nav-link {
              padding: 16px 8px;
              font-size: 20px;
              line-height: 24px;
            }

            .dropdown-container {
              padding: 20px 8px;
            }

            .dropdown-item__content {
              margin-left: 16px;
            }
          }

          @media (max-width: ${screen.tabletMax}px) {
            .hamburger-react {
              display: block;
            }
          }
        `}</style>
      </header>
      <Toast show={loading || didJustAddToCart}>
        {!didJustAddToCart ? (
          "Oppdaterer…"
        ) : (
          <>
            Lagt i kurv{" "}
            <svg
              width="14"
              height="14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.019 10.492l-2.322-3.17A.796.796 0 013.91 6.304L6.628 9.14a1.056 1.056 0 11-1.61 1.351z"
                fill="#fff"
              />
              <path
                d="M5.209 10.693a1.11 1.11 0 01-.105-1.6l5.394-5.88a.757.757 0 011.159.973l-4.855 6.332a1.11 1.11 0 01-1.593.175z"
                fill="#fff"
              />
              <path
                d="M5.331 7.806c.272.326.471.543.815.163.345-.38-.108.96-.108.96l-1.123-.363.416-.76z"
                fill="#fff"
              />
            </svg>
          </>
        )}
      </Toast>
    </>
  )
}
