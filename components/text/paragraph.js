import React from 'react'

const Paragraph = ({ children, light = false, margin = '0' }) => (
  <>
    <p className={ light && 'light' }>{ children }</p>

    <style jsx>{`
      p {
        color: #001425;
        font-family: 'Brandon Text', sans-serif;
        font-size: 18px;
        font-weight: 400;
        line-height: 32px;
        margin: ${margin};
      }

      .light {
        color: #ffffff;
      }
    `}</style>
  </>
)

export default Paragraph