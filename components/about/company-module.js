import '@babel/polyfill'
import React from 'react'

const CompanyModule = ({ title, content }) => (
  <section>
    <div className='title'>
      <h2>{ title }</h2>
    </div>

    <div className='content' dangerouslySetInnerHTML={{ __html: content }} />

    <style jsx>{`
      section {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding-bottom: 50px;
      }

      div.title {
        margin-left: 8.33333vw;
        width: ${8.33333 * 3}vw;
      } 

      div.content {
        padding-left: ${8.33333 / 2}vw;
        width: ${8.33333 * 7}vw;
      }

      @media screen and (min-width: 2000px) {
        section {
          padding: 5vw 0;
        }
      }

      @media screen and (max-width: 500px) {
        section {
          padding: 0 8.33333vw 40px;
        }

        div.title {
          margin-left: 0;
          width: 100%;
        }

        div.content {
          padding-left: 0;
          width: 100%;
        }
      }
    `}</style>
  </section>
)

export default CompanyModule