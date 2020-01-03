import React, { useEffect, useState, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'

import HeadingLarge from 'components/text/heading-large'
import Paragraph from 'components/text/paragraph'
import Badge from 'components/buttons/badge'

const WrappedBadge = ({ image = '', link = '', alt = '' }) => (
  <div>
    <Badge src={image} link={link} alt={alt} />

    <style jsx>{`
      div {
        height: 2.75vw;
        display: inline-block;
        margin: 0 30px 30px 0;
        width: 10vw;
      }

      @media screen and (max-width: 1250px) {
        div {
          height: 3.25vw;
          width: 12vw;
        }
      }

      @media screen and (max-width: 1000px) {
        div {
          height: 7.75vw;
          width: 25vw;
        }
      }

      @media screen and (max-width: 500px) {
        div {
          height: 10vw;
          margin: 0 30px 30px 0;
          width: 30vw;
        }  
      }
    `}</style>
  </div>
)

const PrimaryHero = (props) => {
  const { 
    image = {}, 
    backgroundImage = {},
    title = '',
    content = '',
    badges = []
  } = props
  const controls = useAnimation()
  const pictureRef = useRef()

  useEffect(() => {
    if (pictureRef) {
      if (pictureRef.current.complete) {
        runAnimation()
      } else {
        setTimeout(function tick() {
          if (pictureRef && pictureRef.current.complete) {
            runAnimation()
          } else {
            setTimeout(tick, 50)
          }
        }, 50)
      }
    }
  }, [])

  const runAnimation = () => {
    controls.start({
      opacity: 1
    })
  }

  const badgeList = badges.map(badge => (
    <WrappedBadge key={badge.badge.id} image={badge.badge.url} link={badge.link}  alt={badge.badge.alt} />
  ))

  return (
    <motion.div
      animate={controls}
      initial={{ opacity: 0 }}
      style={{ 
        alignItems: 'center',
        display: 'flex',
        flexFlow: 'row wrap',
        padding: '5vw 0',
        position: 'relative'
      }}
    >
      <picture>
        <img src={backgroundImage.src} alt={backgroundImage.alt} ref={pictureRef} />
      </picture>

      <div className={'heroContent'}>
        <HeadingLarge light margin={'0 0 40px 0'} titleMarkup={title}></HeadingLarge>
        <Paragraph light margin={'0 0 40px 0'}>{ content }</Paragraph>
        
        <div className={'heroBadges'}>
          { badgeList }
        </div>
      </div>

      <div className={'heroImage'}>
        <img src={image.url} alt={image.alt} />
      </div>

      <style jsx>{`
        picture {
          height: 100%;
          left: 0;
          position: absolute;
          top: 0;
          width: 100%;
          z-index: 1;
        }

        img {
          height: 100%;
          object-fit: cover;
          width: 100%;
        }

        div.heroContent {
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: center;
          padding-left: 8.33333vw;
          padding-right: 8.33333vw;
          width: 50%;
          z-index: 10;
        }

        div.heroImage {
          align-items: center;
          display: flex;
          height: 100%;
          justify-content: center;
          width: 50%;
          z-index: 10;
        }

        div.heroBadges {
          
        }

        div.heroImage img {
          max-height: 20vw;
          width: auto;
        }

        @media screen and (min-width: 2000px) {
          h2 {
            font-size: 2vw;
            line-height: 1.2;
          }

          div.heroImage img {
            max-height: 20vw;
          }
        }

        @media screen and (max-width: 1000px) {
          div.heroContent {
            width: 100%;
          }

          div.heroBadges {
            max-width: 100%;
          }

          div.heroImage img {
            max-height: 60vw;
          }
        }
      `}</style>
    </motion.div>
  )
}

export default PrimaryHero