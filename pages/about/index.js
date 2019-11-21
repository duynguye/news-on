import React from 'react'
import { useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'
import { withRedux } from 'config/redux'
import StandardLayout from 'layouts/standard-layout'
import { API_ENDPOINT } from 'config'

import Hero from 'components/content/hero'
import WordpressContent from 'components/content/wordpress-content'

const Page = (props) => {
  const router = useRouter();
  // const title = props.page.title.rendered || ''
  // const content = props.page.content.rendered || ''
  // const featured_media = props.featured_media || {}
  // const { acf = {} } = props

  return (
    <StandardLayout>
      <Hero 
        title={'Test'} 
        // content={acf.hero_content || ''} 
        // featured_media={featured_media}
      />

      <h1>About Page</h1>

      {/* <WordpressContent content={content} /> */}
    </StandardLayout>
  )
}

Page.getInitialProps = async ({ query, reduxStore }) => {
  console.log(query)
  
  const { dispatch } = reduxStore
  const data = await Promise.all([
    fetch(`${API_ENDPOINT}/wp/v2/pages?slug=${query.id}`).then(response => response.json()),
    fetch(`${API_ENDPOINT}/menus/v1/menus/primary`).then(response => response.json()),
  ])

  dispatch({
    type: 'SET_MENU',
    menu: data[1]
  })

  // let featured_media = {}

  // if (data[0][0].featured_media) {
  //   featured_media = await fetch(`${API_ENDPOINT}/wp/v2/media/${data[0][0].featured_media}`)
  //     .then(response => response.json())
  // }

  // // Query ACF Content
  // let acfData = {}

  // if (data[0][0].id) {
  //   const pageID = data[0][0].id

  //   acfData = await fetch(`${API_ENDPOINT}/acf/v3/pages/${pageID}`).then(response => response.json())
  // }

  return {
    page: data[0][0],
    // featured_media,
    // acf: acfData.acf
  }
}

export default withRedux(Page)
