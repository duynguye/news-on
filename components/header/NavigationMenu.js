import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebookF, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons'
import NavLink from 'components/header/NavLink'
import NavLinkDropdown from 'components/header/NavLinkDropdown'

const useMenu = () => {
  return useSelector(
    state => ({
      menu: state.menu
    }),
    shallowEqual
  )
}

const NavigationMenu = () => {
  const { menu } = useMenu()
  const { items } = menu

  const navigationLinks = items.map(item => {
    const url = new URL(item.url)
    const { pathname } = url
    const { child_items } = item

    if (child_items && child_items.length > 0) {
      return (
        <NavLinkDropdown key={item.ID} pathname={pathname} title={item.title} childItems={child_items} />
      )
    } else {
      return (
        <NavLink key={item.ID} pathname={pathname} title={item.title} />
      )
    }
  })

  return (
    <div className='wrapper'>
      <div className='social'>
        <a href='https://compulse.com' target='_blank'>
          <FontAwesomeIcon icon={faTwitter} />
        </a>

        <a href='https://compulse.com' target='_blank'>
          <FontAwesomeIcon icon={faFacebookF} />
        </a>

        <a href='https://compulse.com' target='_blank'>
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>

        <a href='https://compulse.com' target='_blank'>
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>

      <ul>
        { navigationLinks }
      </ul>

      <style jsx>{`
        ul {
          align-items: center;
          display: flex;
          flex: 1;
          flex-direction: row;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        div.wrapper {
          align-items: flex-end;
          display: flex;
          flex-direction: column;
          height: 100%;
        } 

        div.social {
          align-items: center;
          display: flex;
          flex: 1;
          margin-right: 20px;
        }

        a {
          color: #008FD6;
          display: inline-flex;
          font-size: 18px;
          margin-left: 32px;
        }
      `}</style>
    </div>
  )
}

export default NavigationMenu