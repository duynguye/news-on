import React from 'react'

const Badge = ({ src = '', link = '' }) => (
  <a href={link} target='_blank' rel='noreferrer noopener'>
    <img src={src} alt='' />

    <style jsx>{`
      img {
        height: 50px;
        width: 150px;
      }
    `}</style>
  </a>
)

export default Badge