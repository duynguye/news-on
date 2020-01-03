import React from 'react'

const Badge = ({ src = '', link = '', alt = '' }) => (
  <a href={link} target='_blank' rel='noreferrer noopener'>
    <img src={src} alt={alt} />

    <style jsx>{`
      img {
        height: 100%;
        width: 100%;
      }
    `}</style>
  </a>
)

export default Badge