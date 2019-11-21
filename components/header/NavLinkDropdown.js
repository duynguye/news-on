import React, { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/pro-solid-svg-icons'
import { motion } from 'framer-motion'

const NavLinkItem = ({ href, as, title }) => (
  <li>
    <Link href={href} as={as}>
      <a>{ title }</a>
    </Link>

    <style jsx>{`
      li {
        align-items: center;
        background-color: #ffffff;
        display: flex;
        height: 40px;
        margin-bottom: 0;
        width: 200px;
      }  

      li:not(:last-of-type) {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }

      a {
        align-items: center;
        color: #001425;
        display: flex;
        font-family: 'Brandon Text', sans-serif;
        font-size: 16px;
        font-weight: 400;
        height: 100%;
        line-height: 19px;
        padding: 0 16px;
        text-align: left;
        text-decoration: none;
        width: 100%;
      }

      li:hover a {
        background-color: #F2F9FF;
        color: #008FD6;
        text-decoration: none;
      }
    `}</style>
  </li>
)

const NavLinkDropdown = ({ pathname, title, childItems }) => {
  const [isHovering, setHovering] = useState(false)
  let path = pathname.split('/')
  path = path.filter(name => name)

  const childItemsList = childItems.map(child => {
    const { title } = child
    const url = new URL(child.url)
    const { pathname } = url
    let path = pathname.split('/')
    path = path.filter(name => name)

    if (path.length > 1) {
      return (
        <NavLinkItem key={child.ID} href={`/${path[0]}/[slug]`} as={`/${path[0]}/${path[1]}`} title={title} />
      )
    } else {
      return (
        <NavLinkItem key={child.ID} href={`/[slug]`} as={`/${path[0]}`} title={title}/>
      )
    }
  })

  return (
    <li
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Link href={`/[slug]`} as={`/${path[0]}`}>
        <a>
          { title}
          <FontAwesomeIcon icon={faCaretDown} height='12' width='10' style={{ marginLeft: 7 }} />
        </a>
      </Link>

      {
        isHovering &&
        <ul>
          { childItemsList }
        </ul>
      }

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

        ul {
          bottom: 0;
          box-shadow: 0 2px 70px 0 rgba(0, 0, 0, 0.1);
          left: 0;
          list-style: none;
          margin: 0;
          padding: 0;
          position: absolute;
          transform: translateY(100%);
          z-index: 1000;
        }

        a {
          color: #001425;
          font-family: 'Brandon Text', sans-serif;
          font-size: 16px;
          font-weight: 500;
          text-decoration: none;
        }
      `}</style>
    </li>
  )
}

export default NavLinkDropdown