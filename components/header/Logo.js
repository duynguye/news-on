import React from 'react'
import Link from 'next/link'

const Logo = () => (
  <>
    <Link href='/'>
      <a>
        <img src='/logo.png' alt='Logo' />
      </a>
    </Link>

    <style jsx>{`
      img {
        height: 52px;
        width: auto;
      }
    `}</style>
  </>
)

export default Logo