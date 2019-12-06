import React from 'react'

import HeadingLarge from 'components/text/heading-large'
import Paragraph from 'components/text/paragraph'

const FeaturedMedia = ({ alt_text, source_url }) => (
  <div>
    <img src={source_url} alt={alt_text} />

    <style jsx>{`
      img {
        height: calc(100% + 100px);
        object-fit: cover;
        position: absolute;
        width: 100%;
      }  

      @media screen and (max-width: 500px) {
        img {
          display: block;
          height: 200px;
          position: relative;
        }
      }
    `}</style>
  </div>
)

const Hero = ({ title, content = '', featured_media = {} }) => (
  <section>
    <div className='left'>
      <HeadingLarge light margin={'0 0 30px 0'}>{ title }</HeadingLarge>
      { content && <Paragraph light>{ content }</Paragraph> }
    </div>

    <div className='right'>
      { Object.entries(featured_media).length !== 0 && <FeaturedMedia alt_text={featured_media.alt_text} source_url={featured_media.source_url} /> }
    </div>

    <style jsx>{`
      section {
        background-color: #004A87;
        background-image: url(https://sbgi118262site.wpengine.com/wp-content/uploads/2019/11/BG-blue.jpg);
        background-size: cover;
        display: flex;
        flex-direction: row;
        margin-bottom: ${ Object.entries(featured_media).length !== 0 ? 200 : 64 }px;
      }

      div.left {
        flex: 0 1 54.16667vw;
        margin-bottom: ${ content ? 0 : -30 }px;
        padding: 85px 8.33333vw;
      }

      div.right {
        flex: 1;
        position: relative;
      }

      @media screen and (max-width: 500px) {
        section {
          flex-wrap: wrap;
          margin-bottom: 40px;
        }

        div.left {
          flex: 1 1 100%;
          padding: 60px 8.33333vw;
          width: 100%;
        }

        div.right {
          flex: 1 1 100%;
          width: 100%;
        }

      }
    `}</style>
  </section>
)

export default Hero