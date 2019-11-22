import React from 'react'

const title = 'The Company'
const content = 'Watch local news for free from anywhere in the country with NewsON. The free, app provides instant access to live or on-demand newscasts from over 280trusted local TV station partners in over 160 markets. NewsON is available for download on Roku streaming players, Amazon Fire TV, Apple TV, and iOS and Android mobile devices. Viewers can personalize their experience by setting favorite stations, and watch breaking news coverage of major events and storms from multiple local stations. Stay connected anytime, anywhere without a cable subscription or login.'

const CompanyModule = () => (
  <section>
    <div className='title'>
      <h2>{ title }</h2>
    </div>

    <div className='content'>
      <p>{ content }</p>
    </div>

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