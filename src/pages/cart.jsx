import * as React from "react"
import { Link, navigate } from "gatsby"
import { Layout } from "../components/layout"
import { StoreContext } from "../context/store-context"
import { LineItem } from "../components/line-item"
import { formatPrice } from "../utils/format-price"
import {
  table,
  wrap,
  totals,
  grandTotal,
  summary,
  checkoutButton,
  collapseColumn,
  labelColumn,
  imageHeader,
  productHeader,
  emptyStateContainer,
  emptyStateHeading,
  emptyStateSubtitle,
  emptyStateLink,
  title,
} from "./cart.module.css"
import { Seo } from "../components/seo"

export default function CartPage() {
  const { checkout, loading } = React.useContext(StoreContext)
  const emptyCart = checkout.lineItems.length === 0

  const handleCheckout = () => {
    navigate(checkout.webUrl);
  }

  return (
    <Layout>
      <div className={wrap}>
        {emptyCart ? (
          <div className={emptyStateContainer}>
            <h1 className={emptyStateHeading}>Handlekurven er tom</h1>
            <p className={emptyStateSubtitle}>
              Usikker på hvor du skal starte? — kanskje dette hjelper:
            </p>
            <Link to="/search?s=BEST_SELLING" className={emptyStateLink}>
              Se våre nyheter
            </Link>
          </div>
        ) : (
          <>
            <h1 className={title}>Din handlekurv</h1>
            <table className={table}>
              <thead>
                <tr>
                  <th className={imageHeader}>Bilde</th>
                  <th className={productHeader}>Produkt</th>
                  <th className={collapseColumn}>Pris</th>
                  <th>Ant.</th>
                  <th className={[totals, collapseColumn].join(" ")}>Pris</th>
                </tr>
              </thead>
              <tbody>
                {checkout.lineItems.map((item) => (
                  <LineItem item={item} key={item.id} />
                ))}

                <tr className={summary}>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={labelColumn}>Sum varer</td>
                  <td className={totals}>
                    {formatPrice(
                      checkout.subtotalPriceV2.currencyCode,
                      checkout.subtotalPriceV2.amount
                    )}
                  </td>
                </tr>
                <tr className={summary}>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={labelColumn}>Herav mva</td>
                  <td className={totals}>
                    {formatPrice(
                      checkout.totalTaxV2.currencyCode,
                      checkout.totalTaxV2.amount
                    )}
                  </td>
                </tr>
                <tr className={summary}>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={labelColumn}>Frakt</td>
                  <td className={totals}>Beregnes i kassen</td>
                </tr>
                <tr className={grandTotal}>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={labelColumn}>Pris</td>
                  <td className={totals}>
                    {formatPrice(
                      checkout.totalPriceV2.currencyCode,
                      checkout.totalPriceV2.amount
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className={checkoutButton}
            >
              Til kassen
            </button>
          </>
        )}
      </div>
    </Layout>
  )
}

export const Head = () => <Seo />
