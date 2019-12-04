import React from 'react'
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

const Page = (props) => {
  const router = useRouter();
  const title = props.page.title.rendered || ''
  const content = props.page.content.rendered || ''
  const featured_media = props.featured_media || {}
  const { acf = {}, latest } = props
  const { yoast_meta = {} } = props.page || {}
  const pageTitle = yoast_meta.yoast_wpseo_title || ''

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
        image={{
          src: article.fimg_url,
          alt: article.fimg_alt
        }}
      />
    )
  })

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
    </StandardLayout>
  )
}

Page.getInitialProps = async ({ query, reduxStore }) => {
  const { dispatch } = reduxStore
  const data = await Promise.all([
    fetch(`${API_ENDPOINT}/wp/v2/pages?slug=news`).then(response => response.json()),
    fetch(`${API_ENDPOINT}/menus/v1/menus/primary`).then(response => response.json()),
    fetch(`${API_ENDPOINT}/wp/v2/posts?per_page=9&page=1`).then(response => {
      console.log(response.headers)
      
      return response.json()
    }),
    fetch(`${API_ENDPOINT}/wp/v2/partnersper_page=100`).then(response => response.json()),
    fetch(`${API_ENDPOINT}/acf/v3/options/acf-options`).then(response => response.json())
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
    acf: acfData.acf
  }
}

export default withRedux(Page)
