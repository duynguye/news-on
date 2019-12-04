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
    `}</style>
  </section>
)

export default CompanyModule