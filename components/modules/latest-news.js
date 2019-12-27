import React from 'react'
import HeadingMedium from 'components/text/heading-medium'
import Paragraph from 'components/text/paragraph'
import NewsItem from 'components/news/news-item'
import NewsWrapper from 'components/news/news-wrapper'
import he from 'he'
import moment from 'moment'

const LatestNews = ({ latest = [], blurb = '' }) => {
  const latestNewsItems = latest.map(article => {
    const strippedExerpt = article.excerpt.rendered.replace(/<[^>]+>/g, '')
    const { link } = article
    const url = new URL(link)

    return (
      <NewsItem
        key={article.id}
        title={article.title.rendered}
        date={moment(article.date).format('MMMM DD, YYYY')}
        excerpt={he.decode(strippedExerpt)}
        link={url.pathname}
        className={'latest-news-item'}
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
        <HeadingMedium centered margin={`0 0 3vw 0`}>Latest News</HeadingMedium>
        <Paragraph margin={`0 0 4vw 0`}>{ blurb }</Paragraph>
      </div>

      <NewsWrapper>
        { latestNewsItems }
      </NewsWrapper>

      <style jsx>{`
        section {
          background: #F8F8F8;
          padding: 80px 0 40px;
        }

        div {
          margin: 0 auto;
          width: ${8.33333 * 5}vw;
        }

        @media screen and (min-width: 2000px) {
          section {
            padding: 4vw 0 3vw;
          }
        }

        @media screen and (max-width: 1101px) {
          :global(.latest-news-item:nth-child(3)) {
            display: none;
          }
        }

        @media screen and (max-width: 500px) {
          section {
            padding: 40px 0;
          }
          
          div {
            padding: 0 8.33333vw;
            width: 100%;
          }
        }
      `}</style>
    </section>
  )
}

export default LatestNews
