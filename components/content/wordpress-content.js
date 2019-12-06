import React from 'react'

const WordpressContent = ({ content }) => (
  <>
    {
      content && <div dangerouslySetInnerHTML={{ __html: content }}></div>
    }

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
        line-height: 32px;
        margin: 0;
        margin-bottom: 30px;
      }

      :global(.wp-block-image) {
        margin: 0 auto 50px;
        max-width: 70%;
      }

      :global(.wp-block-image img) {
        height: auto;
        margin-bottom: 20px;
        width: 100%;
      }

      :global(figcaption) {
        color: #606060;
        font-family: 'Brandon Text', sans-serif;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
      }

      :global(a) {
        color: #004A87;
        text-decoration: none;
      }

      :global(a:hover) {
        text-decoration: underline;
      }

      :global(ul) {

      }

      :global(li) {
        color: #001329;
        font-family: 'Brandon Text', sans-serif;
        font-size: 18px;
        font-weight: 400;
        line-height: 26px;
        margin: 0;
        margin-bottom: 30px;
      }

      :global(li > ul) {
        margin-top: 30px;
      }

      @media screen and (max-width: 500px) {
        div {
          margin: 0 auto 40px;
          padding: 0 8.33333vw;
          width: 100%;
        }

        :global(p),
        :global(li) {
          font-size: 16px;
          line-height: 28px;
          margin-bottom: 20px;
        }
      }
    `}</style>
  </>
)

export default WordpressContent