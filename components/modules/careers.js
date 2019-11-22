import React from 'react'

import HeadingMedium from 'components/text/heading-medium'
import Paragraph from 'components/text/paragraph'
import TextLink from 'components/buttons/text-link'

const CareersLink = ({ title, path }) => (
  <li>
    <TextLink to={path} external>{ title }</TextLink>

    <style jsx>{`
      li:not(:last-of-type) {
        margin-bottom: 30px;
      }  
    `}</style>
  </li>
)

const Careers = ({ jobs = [] }) => {
  const jobPosts = jobs.map(job => (
    <CareersLink 
      key={job.id}
      title={job.title.rendered}
      path={job.acf.job_external_link}
    />
  ))

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
      `}</style>
    </section>
  )
}

export default Careers
