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
        font-size: 32px;
        font-weight: 700;
        line-height: 38px;
        margin: ${margin};
      }

      .light {
        color: #ffffff;
      }
    `}</style>
  </>
)

export default HeadingMedium