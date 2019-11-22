import React from 'react'
import HeadingMedium from 'components/text/heading-medium'
import Paragraph from 'components/text/paragraph'
import NewsItem from 'components/news/news-item'
import NewsWrapper from 'components/news/news-wrapper'
import he from 'he'
import moment from 'moment'

const LatestNews = ({ latest = [] }) => {
  const latestNewsItems = latest.map(article => {
    const strippedExerpt = article.excerpt.rendered.replace(/<[^>]+>/g, '')

    return (
      <NewsItem
        key={article.id}
        title={article.title.rendered}
        date={moment(article.date).format('MMMM DD, YYYY')}
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
        <Paragraph margin={`0 0 50px 0`}>Sem et tortor consequat id porta nibh venenatis. Facilisi morbi tempus iaculis urna id volutpat lacus. Suspendisse. Ultrices vitae auctor eu augue.</Paragraph>
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
      `}</style>
    </section>
  )
}

export default LatestNews
