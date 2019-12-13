import React from 'react'

const Badge = ({ src = '', link = '' }) => (
  <a href={link} target='_blank' rel='noreferrer noopener'>
    <img src={src} alt='' />

    <style jsx>{`
      img {
        height: 50px;
        width: 150px;
      }

      @media screen and (min-width: 2000px) {
        img {
          height: 2vw;
          width: 6vw;
        }
      }

      @media screen and (max-width: 500px) {
        img {
          height: 40px;
          width: 130px
        }  
      }
    `}</style>
  </a>
)

export default Badge