import React from 'react'

import HeadingMedium from 'components/text/heading-medium'
import HeadingSmall from 'components/text/heading-small'
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

      @media screen and (min-width: 2000px) {
        div {
          height: 40vw;
        }
      }

      @media screen and (max-width: 750px) {
        div {
          height: 425px;
        }
      }

      @media screen and (max-width: 500px) {
        div {
          height: 275px;
          order: 2;
          width: 100%;
        }
      }
    `}</style>
  </div>
)

const TextSection = ({ order = 2, content, centered, title, titleSize, to }) => (
  <div className={ centered && 'centered' }>
    {
      titleSize === 'small'
      ? <HeadingSmall margin={'0 0 24px 0'}>{ title }</HeadingSmall>
      : <HeadingMedium margin={'0 0 24px 0'}>{ title }</HeadingMedium>
    }
    
    { content && <Paragraph margin={'0 0 24px 0'}>{ content }</Paragraph> }
    
    {
      to
      ? <Link to={to}>Learn More</Link>
      : ''
    }

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

      .centered {
        align-items: center;
        text-align: center;
      }

      @media screen and (max-width: 500px) {
        div {
          margin-bottom: ${titleSize === 'small' ? -24 : 0 }px;
          order: 1;
          padding: ${8.33333 * 2}vw 8.33333vw;
          width: 100%;
        }
      }
    `}</style>
  </div>
)

const Section = ({ 
  background = '', 
  foreground = '', 
  foregroundSpecial = false, 
  reverse = false,
  centered = false,
  title = '',
  titleSize = '',
  content = '',
  to = ''
}) => {
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
        centered={centered}
        title={title}
        titleSize={titleSize}
        content={content}
        to={to}
      />

      <style jsx>{`
        section {
          display: flex;
          flex-direction: row;
          flex-flow: row wrap;
        }
      `}</style>
    </section>
  )
}

export default Section