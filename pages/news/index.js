import React, { useState } from 'react'
import { useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'
import { withRedux } from 'config/redux'
import moment from 'moment'
import he from 'he'
import { API_ENDPOINT } from 'config'
import { Helmet } from 'react-helmet'

import StandardLayout from 'layouts/standard-layout'
import Hero from 'components/content/hero'
import NewsWrapper from 'components/news/news-wrapper'
import NewsItem from 'components/news/news-item'

const Page = ({ page, acf = {}, featured_media = {}, latest, headers }) => {
  const router = useRouter();
  const [currentPage, setPage] = useState(1)
  const [posts, setPosts] = useState(latest)

  const title = page.title.rendered || ''
  const { yoast_meta = {} } = page || {}
  const pageTitle = yoast_meta.yoast_wpseo_title || ''

  const latestNewsItems = posts.map(article => {
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
        image={{
          src: article.fimg_url,
          alt: article.fimg_alt
        }}
      />
    )
  })

  const loadMore = () => {

    if ( currentPage < headers.totalPages ) {
      const fetchPosts = async () => {
        const loadedPosts = await fetch(`${API_ENDPOINT}/wp/v2/posts?per_page=9&page=${currentPage + 1}`)
          .then(response => response.json())

        setPosts([ ...posts, ...loadedPosts ])
        setPage(currentPage + 1)

        console.log(posts)
      }

      fetchPosts();
    }
  }

  return (
    <StandardLayout>
      { pageTitle && <Helmet title={pageTitle} /> }
      
      <Hero 
        title={title} 
        content={acf.hero_content || ''} 
        featured_media={featured_media}
      />

      <NewsWrapper>
        { latestNewsItems }
      </NewsWrapper>

      { currentPage < headers.totalPages && <button onClick={() => loadMore()}>Show More</button> }

      <style jsx>{`
        button {
          appearance: none;
          background-color: #008FD6;
          border: none;
          border-radius: 3px;
          color: white;
          cursor: pointer;
          display: block;
          font-family: 'Brandon Text', sans-serif;
          font-size: 16px;
          font-weight: 500;
          margin: 0 auto 60px;
          padding: 16px 46px;
        }  

        @media screen and (min-width: 2000px) {
          button {
            border-radius: 0.2vw;
            font-size: 0.9vw;
            padding: 1vw 3vw;
          }
        }
      `}</style>
    </StandardLayout>
  )
}

Page.getInitialProps = async ({ query, reduxStore }) => {
  const { dispatch } = reduxStore

  const data = await Promise.all([
    fetch(`${API_ENDPOINT}/wp/v2/pages?slug=news`).then(response => response.json()),
    fetch(`${API_ENDPOINT}/menus/v1/menus/primary`).then(response => response.json()),
    fetch(`${API_ENDPOINT}/wp/v2/posts?per_page=9&page=1`).then(response => response.json()),
    fetch(`${API_ENDPOINT}/wp/v2/partners?per_page=100`).then(response => response.json()),
    fetch(`${API_ENDPOINT}/acf/v3/options/acf-options`).then(response => response.json()),
    fetch(`${API_ENDPOINT}/wp/v2/posts?per_page=9`).then(response => {
      return {
        total: response.headers.get('x-wp-total'),
        totalPages: response.headers.get('x-wp-totalpages')
      }
    })
  ])

  let social = []
  if (data[4] && data[4].acf && data[4].acf.social_links) {
    social = data[4].acf.social_links

    dispatch({
      type: 'SET_SOCIAL',
      social
    })
  }

  dispatch({
    type: 'SET_MENU',
    menu: data[1]
  })

  let featured_media = {}

  if (data[0][0].featured_media) {
    featured_media = await fetch(`${API_ENDPOINT}/wp/v2/media/${data[0][0].featured_media}`)
      .then(response => response.json())
  }

  // Query ACF Content
  let acfData = {}

  if (data[0][0].id) {
    const pageID = data[0][0].id

    acfData = await fetch(`${API_ENDPOINT}/acf/v3/pages/${pageID}`).then(response => response.json())
  }

  return {
    page: data[0][0],
    latest: data[2],
    featured_media,
    acf: acfData.acf,
    headers: data[5]
  }
}

export default withRedux(Page)
