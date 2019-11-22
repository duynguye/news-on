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
    `}</style>
  </>
)

export default HeadingLarge