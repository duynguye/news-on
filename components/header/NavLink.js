import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const item = {
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.45,
      ease: 'easeOut'
    },
  },

  hidden: { opacity: 0, y: 30 }
}

const style = {
  margin: '0 20px'
}

const NavLink = ({ pathname, title }) => (
  <motion.li variants={item} style={style}>
    <Link href={pathname}>
      <a>{ title }</a>
    </Link>

    <style jsx>{`
      a {
        color: #001425;
        font-family: 'Brandon Text', sans-serif;
        font-weight: 500;
        text-decoration: none;
      }
    `}</style>
  </motion.li>
)

export default NavLink