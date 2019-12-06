import React, { useEffect, useState, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'

import HeadingLarge from 'components/text/heading-large'
import Paragraph from 'components/text/paragraph'
import Badge from 'components/buttons/badge'

const WrappedBadge = ({ image = '', link = '' }) => (
  <div>
    <Badge src={image} link={link} />

    <style jsx>{`
      div {
        margin: 0 30px 30px 0;
      }  

      @media screen and (max-width: 500px) {
        div {
          margin: 0 20px 20px 0;
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
    <WrappedBadge key={badge.badge.id} image={badge.badge.url} link={badge.link} />
  ))

  return (
    <motion.div
      animate={controls}
      initial={{ opacity: 0 }}
      style={{ 
        alignItems: 'center',
        display: 'flex',
        flexFlow: 'row wrap',
        padding: '50px 0',
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
          width: 50vw;
          z-index: 10;
        }

        div.heroImage {
          align-items: center;
          display: flex;
          height: 100%;
          justify-content: center;
          width: 50vw;
          z-index: 10;
        }

        div.heroBadges {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          max-width: 400px;
        }

        div.heroImage img {
          max-height: 275px;
          width: auto;
        }

        @media screen and (max-width: 500px) {
          div.heroContent {
            width: 100%;
          }

          div.heroBadges {
            max-width: 100%;
          }
        }
      `}</style>
    </motion.div>
  )
}

export default PrimaryHero