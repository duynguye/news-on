import React from 'react'

const HeadingMedium = ({ children, light = false, margin = '0', titleMarkup = '', centered = false }) => (
  <>
    { 
      titleMarkup 
      ? <h2 className={ light && 'light' } dangerouslySetInnerHTML={{ __html: titleMarkup }}></h2>
      : <h2 className={ light && 'light' }>{ children }</h2>
    }

    <style jsx>{`
      h2 {
        color: #004A87;
        font-family: 'Brandon Text', sans-serif;
        font-size: 32px;
        font-weight: 700;
        line-height: 38px;
        margin: ${margin};
        text-align: ${centered ? 'center' : 'left' }
      }

      .light {
        color: #ffffff;
      }

      @media screen and (max-width: 500px) { 
        h2 {
          font-size: 28px;
          line-height: 34px;
        }
      }
    `}</style>
  </>
)

export default HeadingMedium