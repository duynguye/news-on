import React from 'react'

const title = 'Our Partners'
const content = 'NewsON partners with 16 station groups to provide viewers with free access to live and on-demand newscasts from over 280 stations in over 160 U.S. markets, covering more than 96% of the U.S. population. Participating station groups include ABC Owned Television Station Group, Berkshire Hathaway, Cox Media Group, Dispatch Broadcast Group, Fort Myers Broadcasting Company, Forum Communications, Graham Media Group, Gray Television, Hearst Television, Heritage Broadcasting Company, Hubbard Broadcasting, McKinnon Broadcasting, Meredith Corporation, Sinclair Broadcast Group, and TEGNA. We are always working to expand our roster of local TV stations to provide as many options as possible for our viewers. '

const PartnersModule = () => (
  <section>
    <div className='title'>
      <h2>{ title }</h2>
    </div>

    <div className='content'>
      <p>{ content }</p>
    </div>

    <style jsx>{`
      section {
        align-items: center;
        background: #F2F9FF;
        display: flex;
        flex-direction: column;
        padding: 80px 0;
      }

      div.title {
        text-align: center;
        width: ${8.33333 * 3}vw;
      } 

      div.content {
        width: 50vw;
      }

      p {
        margin-bottom: 0;
      }
    `}</style>
  </section>
)

export default PartnersModule