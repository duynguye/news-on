import React from 'react'
import { useRouter, Router } from 'next/router'
import fetch from 'isomorphic-unfetch'
import { withRedux } from 'config/redux'
import StandardLayout from 'layouts/standard-layout'
import { API_ENDPOINT } from 'config'
import { Helmet } from 'react-helmet'

import HeadingLarge from 'components/text/heading-large'
import WordpressContent from 'components/content/wordpress-content'

const Page = (props) => {
  const router = useRouter();
  const title = props.page.title.rendered || ''
  const content = props.page.content.rendered || ''
  const { yoast_meta = {} } = props.page || {}
  const pageTitle = yoast_meta.yoast_wpseo_title || ''
  // const { acf = {} } = props

  return (
    <StandardLayout>
      { pageTitle && <Helmet title={pageTitle} /> }
      
      <div>
        <img src={props.page.fimg_url} />
        <HeadingLarge margin={`0 0 50px 0`} centered>{ title }</HeadingLarge>
      </div>

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
      `}</style>
    </StandardLayout>
  )
}

Page.getInitialProps = async ({ query, reduxStore, res }) => {
  const { dispatch } = reduxStore
  const data = await Promise.all([
    fetch(`${API_ENDPOINT}/wp/v2/posts?slug=${query.id}`).then(response => response.json()),
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

  // // Query ACF Content
  // let acfData = {}

  // if (data[0][0].id) {
  //   const pageID = data[0][0].id

  //   acfData = await fetch(`${API_ENDPOINT}/acf/v3/pages/${pageID}`).then(response => response.json())
  // }

  return {
    page: data[0][0],
    // acf: acfData.acf
  }
}

export default withRedux(Page)
