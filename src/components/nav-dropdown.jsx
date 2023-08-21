import React from "react"
import { Link } from "gatsby"
import slugify from "@sindresorhus/slugify"

const NavDropdown = ({ products }) => {
  return (
    <div className="dropdown-content">
      <div className="dropdown-container">
        {products.map((item, idx) => (
          <div className="dropdown-item" role="button" tabIndex="0" key={idx}>
            <Link to={`/products/${slugify(item.productType)}`} key={idx}>
              <div className="dropdown-item__content">
                <p className="dropdown-item__title">{item.productType}</p>

                <p className="dropdown-item__subtitle">
                  {item.metafields[0]?.value}
                </p>

              </div>
            </Link>
          </div>
        ))}
      </div>
      <style jsx>{`
        .dropdown-container {
          display: flex;
          flex-direction: column;
          margin: 0 auto;
          background-color: #22272a;
          box-shadow: 1px 1px 10px 0 rgba(0, 0, 0, 0.05);
        }
        .dropdown-item {
          display: flex;
          padding: 16px 8px;
          box-sizing: border-box;
        }
        .dropdown-item__content {
          text-align: left;
          width: 240px;
        }
        .dropdown-item__title {
          margin-bottom: 10px;
          font-weight: 400;
          font-size: 18px;
          line-height: 20px;
          color: #fff;
        }
        .dropdown-item__subtitle {
          font-weight: 300;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0.2px;
          color: #ffffff92;
        }
        .dropdown-item:hover {
          background: #0076a3;
        }
        .dropdown-item:hover .dropdown-item__title {
          color: #fff;
        }
        @media (max-width: 1024px) {
          .dropdown {
            flex-direction: column;
          }
          .dropdown-item {
            width: 285px;
          }
        }
        @media (max-width: 768px) {
          .dropdown-container {
            padding: 24px 40px;
          }
          .dropdown-container a {
            width: 100%;
          }
          .dropdown-item:hover {
            background: none;
            border: none;
          }
        }
        @media (max-width: 600px) {
          .dropdown-container {
            flex-direction: column;
            padding: 16px 0;
          }
          .dropdown-item {
            width: 100%;
            padding: 10px 16px;
          }
          .dropdown-item a {
            display: block;
            width: 100%;
          }
          .dropdown-item__title {
            font-size: 16px;
            line-height: 16px;
          }
          .dropdown-item__subtitle {
            font-size: 14px;
            line-height: 20px;
          }
        }
      `}</style>
    </div>
  )
}

export default NavDropdown
