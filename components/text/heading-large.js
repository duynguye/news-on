import React from 'react'

const HeadingLarge = ({ children, light = false, margin = '0', titleMarkup = '' }) => (
  <>
    <h1 className={ light && 'light' } dangerouslySetInnerHTML={{ __html: titleMarkup }}>{ children }</h1>

    <style jsx>{`
      h1 {
        font-family: 'Brandon Text', sans-serif;
        font-size: 48px;
        font-weight: 700;
        line-height: 58px;
        margin: ${margin};
      }

      .light {
        color: #ffffff;
      }
    `}</style>
  </>
)

export default HeadingLarge