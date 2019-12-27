import React from 'react'

import HeadingMedium from 'components/text/heading-medium'
import Paragraph from 'components/text/paragraph'
import TextLink from 'components/buttons/text-link'

const CareersLink = ({ title, path }) => (
  <li>
    <TextLink to={path}>{ title }</TextLink>

    <style jsx>{`
      li:not(:last-of-type) {
        margin-bottom: 30px;
      }  
    `}</style>
  </li>
)

const Careers = ({ jobs = [] }) => {
  const jobPosts = jobs.map(job => {
    console.log(job)
    const url = new URL(job.link)

    return (
      <CareersLink 
        key={job.id}
        title={job.title.rendered}
        path={url.pathname}
      />
    )
  })

  return (
    <section id='careers'>
      <div className='title'>
        <HeadingMedium>Careers</HeadingMedium>
      </div>
  
      <div className='content'>
        <Paragraph margin={`0 0 60px 0`}>We're looking for more superstars to join our growing team. Take a look at our open positions below.</Paragraph>
  
        <ul>
          { jobPosts }
        </ul>
      </div>
  
      <style jsx>{`
        section {
          display: flex;
          flex-flow: row wrap;
          padding: 80px 0;
        }
  
        div.title {
          margin-left: 8.33333vw;
          width: ${8.33333 * 3}vw;
        } 
  
        div.content {
          padding: 0 ${8.33333 / 2}vw;
          width: ${8.33333 * 5}vw;
        }
  
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        @media screen and (min-width: 2000px) {
          section {
            padding: 4.5vw 0;
          }
        }

        @media screen and (max-width: 650px) {
          section {
            flex-direction: column;
          }

          div.title {
            margin-bottom: 30px;
            width: 100%;
          }

          div.content {
            padding: 0 8.33333vw;
            width: 100%;
          }
        }
      `}</style>
    </section>
  )
}

export default Careers
