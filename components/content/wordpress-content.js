import React from 'react'

const WordpressContent = ({ content }) => (
  <>
    <div dangerouslySetInnerHTML={{ __html: content }}></div>
    <style jsx>{`
      div {
        margin: 0 auto 80px;
        padding: 0 4.16666vw;
        width: 50vw;
      }
      :global(h2) {
        color: #004A87;
        font-family: 'Brandon Text', sans-serif;
        font-size: 32px;
        font-weight: 700;
        line-height: 38px;
        margin: 0;
        margin-bottom: 30px;
      }

      :global(h3) {
        color: #004A87;
        font-family: 'Brandon Text', sans-serif;
        font-size: 24px;
        font-weight: 700;
        line-height: 29px;
        margin: 0;
        margin-bottom: 30px;
      }

      :global(p) {
        color: #001329;
        font-family: 'Brandon Text', sans-serif;
        font-size: 18px;
        font-weight: 400;
        line-height: 26px;
        margin: 0;
        margin-bottom: 30px;
      }

      :global(.wp-block-image) {
        margin: 0 auto 50px;
        max-width: 70%;
      }

      :global(img) {
        height: auto;
        width: 100%;
      }

      :global(figcaption) {
        color: #4D6177;
        font-family: 'Brandon Text', sans-serif;
        font-size: 14px;
        font-weight: 500;
      }

      :global(a) {
        color: #004A87;
        text-decoration: none;
      }

      :global(a:hover) {
        text-decoration: underline;
      }
    `}</style>
  </>
)

export default WordpressContent