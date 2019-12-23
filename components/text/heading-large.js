import '@babel/polyfill'
import React from 'react'

const HeadingLarge = ({ children, light = false, margin = '0', titleMarkup = '', centered = false }) => (
  <>
    { 
      titleMarkup 
      ? <h1 className={ light && 'light' } dangerouslySetInnerHTML={{ __html: titleMarkup }}></h1>
      : <h1 className={ light && 'light' }>{ children }</h1>
    }

    <style jsx>{`
      h1 {
        color: #015391;
        font-family: 'Brandon Text', sans-serif;
        font-size: 48px;
        font-weight: 700;
        line-height: 58px;
        margin: ${margin};
        text-align: ${centered ? 'center' : 'left' }
      }

      .light {
        color: #ffffff;
      }

      @media screen and (min-width: 2000px) {
        h1 {
          font-size: 2.75vw;
          line-height: 1.4;
        }
      }

      @media screen and (max-width: 500px) {
        h1 {
          font-size: 30px;
          line-height: 40px;
        }  
      }
    `}</style>
  </>
)

export default HeadingLarge