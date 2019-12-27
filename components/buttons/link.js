import React from 'react'
import Link from 'next/link'

const PageLink = ({ to = '', target = '', margin = '0', as='', children }) => (
  <>
    <Link href={to} as={as}>
      <a target={target}>{ children }</a>
    </Link>

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

      a::before {
        border-bottom: 2px solid #70D549;
        bottom: -5px;
        content: '';
        height: 2px;
        position: absolute;
        width: 100%;
      }
    `}</style>
  </>
)

export default PageLink