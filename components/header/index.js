import React from 'react'
import Logo from 'components/header/Logo'
import NavigationMenu from 'components/header/NavigationMenu'

const Header = ({ }) => (
  <header>
    <Logo />
    <NavigationMenu />
    
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
    `}</style>
  </header>
)

export default Header