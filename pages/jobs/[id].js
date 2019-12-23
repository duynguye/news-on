import '@babel/polyfill'
import React from 'react'
import { useRouter, Router } from 'next/router'
import fetch from 'isomorphic-unfetch'
import { withRedux } from 'config/redux'
import StandardLayout from 'layouts/standard-layout'
import { API_ENDPOINT } from 'config'
import { Helmet } from 'react-helmet'

import Hero from 'components/content/hero'
import HeadingLarge from 'components/text/heading-large'
import WordpressContent from 'components/content/wordpress-content'

const Page = (props) => {
  const router = useRouter();
  const title = props.page.title.rendered || ''
  const content = props.page.content.rendered || ''
  const { yoast_meta = {} } = props.page || {}
  const pageTitle = yoast_meta.yoast_wpseo_title || ''
  const featured_media = props.featured_media || {}

  return (
    <StandardLayout>
      { pageTitle && <Helmet title={pageTitle} /> }
      
      <Hero 
        title={title} 
        content={''} 
        featured_media={featured_media}
      />

      <WordpressContent content={content} />

      <style jsx>{`
        div {
          margin: 0 auto;
          padding: 80px 0 0 0;
          width: 50vw;
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
        }

        img {
          margin-bottom: 60px;
        }

        @media screen and (max-width: 500px) {
          div {
            margin-top: -40px;
            padding: 40px 0 0;
            width: 100vw;
          }

          img {
            width: 100%;
          }
        }
      `}</style>
    </StandardLayout>
  )
}

Page.getInitialProps = async ({ query, reduxStore, res }) => {
  const { dispatch } = reduxStore
  const data = await Promise.all([
    fetch(`${API_ENDPOINT}/wp/v2/jobs?slug=${query.id}`).then(response => response.json()),
    fetch(`${API_ENDPOINT}/menus/v1/menus/primary`).then(response => response.json()),
    fetch(`${API_ENDPOINT}/acf/v3/options/acf-options`).then(response => response.json())
  ])

  let social = []
  if (data[2] && data[2].acf && data[2].acf.social_links) {
    social = data[2].acf.social_links

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

  return {
    page: data[0][0],
    featured_media
  }
}

export default withRedux(Page)
