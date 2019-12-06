import React from 'react'
import Link from 'next/link'
import ButtonBase from '@material-ui/core/ButtonBase'

const MobileNavLink = ({ pathname, title }) => {
  let path = pathname.split('/')
  path = path.filter(name => name)

  return (
    <li>
      <Link href={`/[slug]`} as={`/${path[0]}`} passHref>
        <ButtonBase
          focusRipple
          style={{
            height: 60,
            textDecoration: 'none',
            width: '100%'
          }}
          component='a'
        >
          <span>
            { title }
          </span>
        </ButtonBase>
      </Link>

      <style jsx>{`
        li {
          list-style: none;
          margin: 0;
          text-align: left;
        }

        span {
          align-items: center;
          color: #001425;
          display: flex;
          font-family: 'Brandon Text', sans-serif;
          font-size: 16px;
          font-weight: 400;
          height: 100%;
          justify-content: flex-start;
          padding: 0 8.33333vw;
          text-decoration: none;
          text-align: left;
          width: 100%;
        }

        a,
        a:hover,
        a:focus {
          text-decoration: none;
        }
      `}</style>
    </li>
  )
}

export default MobileNavLink