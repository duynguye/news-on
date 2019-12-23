import '@babel/polyfill'
import React from 'react'
import Link from 'next/link'

const NavLink = ({ pathname, title }) => {
  let path = pathname.split('/')
  path = path.filter(name => name)

  return (
    <li>
      <Link href={`/[slug]`} as={`/${path[0]}`}>
        <a>{ title }</a>
      </Link>

      <style jsx>{`
        li {
          align-items: center;
          display: flex;
          justify-content: center;
          height: 100%;
          margin: 0 20px;
          position: relative;
        }

        li:hover a {
          color: #008FD6;
          text-decoration: none;
        }

        li::after {
          background: #70D549;
          bottom: 0;
          content: '';
          display: none;
          height: 4px;
          left: 0;
          position: absolute;
          width: 100%;
        }

        li:hover::after {
          display: block;
        }

        a {
          color: #001425;
          font-family: 'Brandon Text', sans-serif;
          font-size: 16px;
          font-weight: 500;
          text-decoration: none;
        }

        @media screen and (min-width: 2000px) {
          li {
            margin: 0 1vw;
          }
          
          a {
            font-size: 0.9vw;
          }
        }
      `}</style>
    </li>
  )
}

export default NavLink