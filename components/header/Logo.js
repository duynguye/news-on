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
      a {
        margin-right: auto;
      }
      
      img {
        height: 52px;
        width: auto;
      }

      @media screen and (min-width: 2000px) {
        img {
          height: 100px;
        }
      }
    `}</style>
  </>
)

export default Logo