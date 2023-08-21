import React from "react"

export function DropdownIcon({ rotate }) {
  return (
    <svg
      className={`dropdown-icon ${rotate && "active"}`}
      width="19"
      height="12"
      viewBox="0 0 19 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.66667 8.99992L2 2.33325"
        stroke="#fff"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
      <path
        d="M9.77222 10.1067L17.4656 2.41333"
        stroke="#fff"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
      <style jsx>{`
        .dropdown-icon {
          display: none;
          transform: rotate(0);
          transition: transform 0.3s;
        }
        .dropdown-icon.active {
          transform: rotate(180deg);
        }
        @media (max-width: 769px) {
          .dropdown-icon {
            display: block;
          }
        }
        @media (max-width: 568px) {
          .dropdown-icon {
            width: 15px;
            height: 9px;
          }
        }
      `}</style>
    </svg>
  )
}
