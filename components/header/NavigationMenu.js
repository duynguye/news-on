import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { motion } from 'framer-motion'
import NavLink from 'components/header/NavLink'

const list = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  },
  hidden: {
    opacity: 0
  }
}

const style = {
  display: 'flex',
  flexDirection: 'row',
  listStyle: 'none',
  margin: 0,
  padding: 0
}

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

    return (
      <NavLink key={item.ID} pathname={pathname} title={item.title} />
    )
  })

  return (
    <div>
      <motion.ul animate='visible' initial='hidden' variants={list} style={style}>
        { navigationLinks }
      </motion.ul>
    </div>
  )
}

export default NavigationMenu