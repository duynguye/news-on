import React from 'react'
import Link from 'next/link'

const TextLink = ({ to = '', external = false, margin = '0', children }) => (
  <>
    { 
      !external
      ? <Link href={to}>
          <a>{ children }</a>
        </Link>
      : <a target='_blank' href={to}>{ children }</a>
    }

    <style jsx>{`
      a {
        color: #008FD6;
        display: inline-flex;
        font-family: 'Brandon Text', sans-serif;
        font-size: 18px;
        font-weight: 700;
        line-height: 22px;
        margin: ${margin};
        position: relative;
        text-decoration: none;
      }

      a:hover {
        text-decoration: none;
      }

      a:hover::before {
        opacity: 1;
      }

      a::before {
        border-bottom: 2px solid #70D549;
        bottom: -5px;
        content: '';
        height: 2px;
        opacity: 0;
        position: absolute;
        transition: all 0.175s ease-in-out;
        width: 100%;
      }

      @media screen and (min-width: 2000px) {
        a {
          font-size: 1vw;
        }
      }
    `}</style>
  </>
)

export default TextLink