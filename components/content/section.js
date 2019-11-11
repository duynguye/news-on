import React from 'react'

import HeadingMedium from 'components/text/heading-medium'
import Paragraph from 'components/text/paragraph'
import Link from 'components/buttons/link'

const ImageSection = ({ background, foreground, order = 1, foregroundSpecial = false }) => (
  <div>
    <img className={'background'} src={background} />
    <img className={'foreground' + (foregroundSpecial ? ' special' : '')} src={foreground} />

    <style jsx>{`
      div {
        height: 600px;
        order: ${order};
        position: relative;
        width: 50vw;
      }

      img.background {
        height: 100%;
        width: 100%;
      }

      img.foreground {
        bottom: 0;
        left: 50%;
        position: absolute;
        transform: translateX(-50%);
        width: 80%;
      }

      img.foreground.special {
        transform: translateX(-50%) translateY(23.21%);
      }
    `}</style>
  </div>
)

const TextSection = ({ order = 2 }) => (
  <div>
    <HeadingMedium margin={'0 0 24px 0'}>About NewsON</HeadingMedium>
    <Paragraph margin={'0 0 24px 0'}>Now with over 285 local station partners and over 175 markets in the country, NewsON delivers a new way to access and experience local news. Let's take local news to the next level. Let's do it together.</Paragraph>
    <Link to={'/about'}>Learn More</Link>

    <style jsx>{`
      div {
        align-items: flex-start;
        display: flex;
        flex-direction: column;
        justify-content: center;
        order: ${order};
        padding: 4.16666vw;
        width: 50vw;
      }
    `}</style>
  </div>
)

const Section = ({ background = '', foreground = '', foregroundSpecial = false, flipped = false, reverse = false }) => {
  return (
    <section>
      <ImageSection 
        background={background}
        foreground={foreground}
        foregroundSpecial={foregroundSpecial}
        order={reverse ? 2 : 1}
      />
      
      <TextSection 
        order={reverse ? 1 : 2}
      />

      <style jsx>{`
        section {
          display: flex;
          flex-direction: row;
        }
      `}</style>
    </section>
  )
}

export default Section