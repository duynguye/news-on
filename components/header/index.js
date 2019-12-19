import React, { useState } from 'react'
import Logo from 'components/header/Logo'
import NavigationMenu from 'components/header/NavigationMenu'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Divider from '@material-ui/core/Divider'
import { useSelector, shallowEqual } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/pro-light-svg-icons'

import MobileNavLink from 'components/header/MobileNavLink'

const useMenu = () => {
  return useSelector(
    state => ({
      menu: state.menu
    }),
    shallowEqual
  )
}

const useSocial = () => {
  return useSelector(
    state => ({
      social: state.social
    }),
    shallowEqual
  )
}

const SocialIcon = ({ icon, url }) => (
  <a href={url} target='_blank'>
    <FontAwesomeIcon icon={icon} />

    <style jsx>{`
      a {
        color: #008FD6;
        display: inline-flex;
        font-size: 18px;
        margin-left: 32px;
      }

      @media screen and (max-width: 2000px) {
        a {
          font-size: 1vw;
          margin-left: 2vw;
        }
      }
    `}</style>
  </a>
)


const DrawerMenu = () => {
  const { menu } = useMenu()
  const { social } = useSocial()
  const { items } = menu

  const navigationLinks = items.map(item => {
    const url = new URL(item.url)
    const { pathname } = url
    const { child_items } = item

    if (child_items && child_items.length > 0) {
      return (
        <MobileNavLink key={item.ID} pathname={pathname} title={item.title} />
      )
    } else {
      return (
        <MobileNavLink key={item.ID} pathname={pathname} title={item.title} />
      )
    }
  })

  return (
    <div>
      { navigationLinks }

      <Divider />

      <style jsx>{`
        div {
          width: 250px;
        }  
      `}</style>
    </div>
  )
}

const Header = ({ }) => {
  const [isOpen, setState] = useState(false)

  const toggleDrawer = (open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift' )) {
      return;
    }

    setState(open)
  }

  return (
    <header>
      <Logo />
      <NavigationMenu />
      
      <button onClick={toggleDrawer(true)}>
        <FontAwesomeIcon icon={faBars} height={20} width={20} />
      </button>

      <SwipeableDrawer
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <DrawerMenu />
      </SwipeableDrawer>
      
      <style jsx>{`
        header {
          background-color: #ffffff;
          box-shadow: 0 2px 70px 0 rgba(0, 74, 135, 0.1);
          align-items: center;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          height: 100px;
          padding: 0 64px;
          position: relative;
        }

        button {
          appearance: none;
          background-color: #efefef;
          border: none;
          border-radius: 3px;
          display: none;
          font-size: 24px;
          padding: 10px 15px;
        }

        @media screen and (min-width: 2000px) {
          header {
            height: 200px;
            padding: 0 128px;
          }
        }

        @media screen and (max-width: 600px) {
          header {
            padding: 0 8.33333vw;
          }

          button {
            display: inline-flex;
          }
        }
      `}</style>
    </header>
  )
}

export default Header