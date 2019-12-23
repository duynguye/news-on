import '@babel/polyfill'
import React from 'react'

const NewsWrapper = ({ children }) => (
  <ul>
    { children }

    <style jsx>{`
      ul {
        align-items: centered;
        display: flex;
        flex-flow: row wrap;
        list-style: none;
        margin: 0 auto 40px;
        padding: 0;
        width: calc(${8.33333 * 10}vw + 30px);
      }  
    `}</style>
  </ul>
)

export default NewsWrapper