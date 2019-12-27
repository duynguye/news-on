import React from 'react'

const HeadingMedium = ({ children, light = false, margin = '0', titleMarkup = '' }) => (
  <>
    { 
      titleMarkup 
      ? <h3 className={ light && 'light' } dangerouslySetInnerHTML={{ __html: titleMarkup }}></h3>
      : <h3 className={ light && 'light' }>{ children }</h3>
    }

    <style jsx>{`
      h3 {
        color: #004A87;
        font-family: 'Brandon Text', sans-serif;
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 0.5px;
        line-height: 28px;
        margin: ${margin};
        width: 100%;
      }

      .light {
        color: #ffffff;
      }

      @media screen and (min-width: 2000px) {
        h3 {
          font-size: 1.5vw;
          line-height: 1.5;
        }
      }
    `}</style>
  </>
)

export default HeadingMedium