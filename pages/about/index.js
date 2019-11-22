import React from 'react'
import { useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'
import { withRedux } from 'config/redux'
import StandardLayout from 'layouts/standard-layout'
import { API_ENDPOINT } from 'config'

import Hero from 'components/content/hero'
import WordpressContent from 'components/content/wordpress-content'
import CompanyModule from 'components/about/company-module'
import PartnersModule from 'components/about/partners-module'
import LatestNews from 'components/modules/latest-news'
import Careers from 'components/modules/careers'

const Page = (props) => {
  const router = useRouter();
  const title = props.page.title.rendered || ''
  const content = props.page.content.rendered || ''
  const featured_media = props.featured_media || {}
  const { acf = {}, partners, jobs } = props

  return (
    <StandardLayout>
      <Hero 
        title={title} 
        content={acf.hero_content || ''} 
        featured_media={featured_media}
      />

      <CompanyModule />
      <PartnersModule partners={partners} />
      <LatestNews latest={props.latest} />
      <Careers jobs={jobs} />

      <WordpressContent content={content} />
    </StandardLayout>
  )
}

Page.getInitialProps = async ({ query, reduxStore }) => {
  const { dispatch } = reduxStore
  const data = await Promise.all([
    fetch(`${API_ENDPOINT}/wp/v2/pages?slug=about`).then(response => response.json()),
    fetch(`${API_ENDPOINT}/menus/v1/menus/primary`).then(response => response.json()),
    fetch(`${API_ENDPOINT}/wp/v2/posts?per_page=3`).then(response => response.json()),
    fetch(`${API_ENDPOINT}/wp/v2/partners?per_page=100`).then(response => response.json()),
    fetch(`${API_ENDPOINT}/wp/v2/jobs?per_page=100`).then(response => response.json())
  ])

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
    partners: data[3],
    jobs: data[4]
  }
}

export default withRedux(Page)
