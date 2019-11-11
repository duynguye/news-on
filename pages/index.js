/**
 * Front Page
 */

import React from 'react'
import fetch from 'isomorphic-unfetch'
import { withRedux } from 'config/redux'
import { API_ENDPOINT } from 'config'

import StandardLayout from 'layouts/standard-layout'
import PrimaryHero from 'components/primary-hero'
import Section from 'components/content/section'

const Home = ({ featured_image, primary_hero, badges }) => {
  const { primary_hero_image, primary_hero_title, primary_hero_content } = primary_hero

  return (
    <StandardLayout>
      <PrimaryHero 
        title={primary_hero_title}
        content={primary_hero_content}
        image={primary_hero_image}
        backgroundImage={featured_image}
        badges={badges}
      />

      <Section 
        background={'https://sbgi118262site.wpengine.com/wp-content/uploads/2019/11/BG-green.jpg'}
        foreground={'https://sbgi118262site.wpengine.com/wp-content/uploads/2019/11/roku-1.png'}
        title={'About NewsON'}
        content={"Now with over 285 local station partners and over 175 markets in the country, NewsON delivers a new way to access and experience local news. Let's take local news to the next level. Let's do it together."}
      />
      
      <Section 
        background={'https://sbgi118262site.wpengine.com/wp-content/uploads/2019/11/BG-blue.jpg'}
        foreground={'https://sbgi118262site.wpengine.com/wp-content/uploads/2019/11/iphone-home.png'}
        foregroundSpecial={true}
        reverse
        centered
        title={'Watch live, local TV newscasts for free. No cable subscription or login required.'}
        titleSize={'small'}
      />
    </StandardLayout>
  )
}

Home.getInitialProps = async ({ reduxStore }) => {
  const { dispatch } = reduxStore
  const data = await Promise.all([
    fetch(`${API_ENDPOINT}/wp/v2/frontpage`).then(response => response.json()),
    fetch(`${API_ENDPOINT}/menus/v1/menus/primary`).then(response => response.json()),
    fetch(`${API_ENDPOINT}/acf/v3/options/acf-options`).then(response => response.json())
  ])

  let image = {}

  if (data[0].featured_media) {
    const featured_media = await fetch(`${API_ENDPOINT}/wp/v2/media/${data[0].featured_media}`)
      .then(response => response.json())

    image = {
      alt: featured_media.alt_text,
      height: featured_media.media_details.height,
      src: featured_media.media_details.sizes.full.source_url,
      sizes: featured_media.media_details.sizes,
      width: featured_media.media_details.width
    }
  }

  let badges = []
  let page_acf = {}

  if (data[0].id) {
    page_acf = await fetch(`${API_ENDPOINT}/acf/v3/pages/${data[0].id}`).then(response => response.json())
  }

  if (data[2] && data[2].acf && data[2].acf.app_links) {
    badges = data[2].acf.app_links
  }

  dispatch({
    type: 'SET_MENU',
    menu: data[1]
  })

  return {
    page: data[0],
    featured_image: image,
    primary_hero: page_acf && page_acf.acf,
    badges
  }
}

export default withRedux(Home)
