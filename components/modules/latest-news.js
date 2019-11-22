import React from 'react'
import Link from 'next/link'
import HeadingMedium from 'components/text/heading-medium'
import HeadingSmall from 'components/text/heading-small'
import Paragraph from 'components/text/paragraph'
import he from 'he'

const NewsItem = ({ title, date, excerpt, image }) => (
  <li>
    <Link href=''>
      <a>
        <img src='https://sbgi118262site.wpengine.com/wp-content/uploads/2019/11/close-up-photo-of-blue-jellyfish-2625275-scaled.jpg' />
        <HeadingSmall margin={`0 0 5px 0`}>{ title }</HeadingSmall>
        <span>{ date }</span>
        <p>{ excerpt }</p>
      </a>
    </Link>

    <style jsx>{`
      li {
        height: auto;
        margin: 0 15px 30px;
        width: calc(${100 / 3}% - 30px);
      }

      @media screen and (max-width: 1100px) {
        li {
          width: calc(${100 / 2}% - 30px);
        }
      }

      @media screen and (max-width: 650px) {
        li {
          width: 100%;
        }
      }

      a {
        background: #ffffff;
        box-shadow: 0 2px 70px 0 rgba(0, 74, 135, 0.08);
        display: block;
        height: calc(100% - 35px);
        margin-top: 35px;
        padding: 0 35px 35px;
        transition: box-shadow 0.2s ease;
        width: 100%;
      }

      span {
        color: #99a0ac;
        display: block;
        font-family: 'Brandon Text', sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 17px;
        margin-bottom: 20px;
      }

      p {
        font-size: 15px;
        line-height: 24px;
        margin-bottom: 0;
      }

      a:hover {
        text-decoration: none;
        box-shadow: 0 2px 70px 0 rgba(0, 74, 135, 0.38);
      }

      img {
        box-shadow: 0 2px 70px 0 rgba(0, 0, 0, 0.1);
        display: inline-block;
        height: 250px;
        object-fit: cover;
        margin-top: -35px;
        margin-bottom: 40px;
        width: 100%;  
      }
    `}</style>
  </li>
)

const LatestNews = ({ latest = [] }) => {
  const latestNewsItems = latest.map(article => {
    const strippedExerpt = article.excerpt.rendered.replace(/<[^>]+>/g, '')

    return (
      <NewsItem
        key={article.id}
        title={article.title.rendered}
        date={article.date}
        excerpt={he.decode(strippedExerpt)}
        image={{
          src: article.fimg_url,
          alt: article.fimg_alt
        }}
      />
    )
  })

  return (
    <section>
      <div>
        <HeadingMedium centered margin={`0 0 35px 0`}>Latest News</HeadingMedium>
        <Paragraph margin={`0 0 35px 0`}>Sem et tortor consequat id porta nibh venenatis. Facilisi morbi tempus iaculis urna id volutpat lacus. Suspendisse. Ultrices vitae auctor eu augue.</Paragraph>
      </div>

      <ul>
        { latestNewsItems }
      </ul>

      <style jsx>{`
        section {
          background: #F8F8F8;
          padding: 80px 0;
        }

        div {
          margin: 0 auto;
          width: ${8.33333 * 5}vw;
        }

        ul {
          align-items: centered;
          display: flex;
          flex-flow: row wrap;
          list-style: none;
          margin: 0 auto;
          padding: 0;
          width: calc(${8.33333 * 10}vw + 30px);
        }
      `}</style>
    </section>
  )
}

export default LatestNews
