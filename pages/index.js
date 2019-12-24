/**
 * Front Page
 */

import React from 'react'
import fetch from 'isomorphic-unfetch'
import { withRedux } from 'config/redux'
import { API_ENDPOINT } from 'config'
import { Helmet } from 'react-helmet'

import StandardLayout from 'layouts/standard-layout'
import PrimaryHero from 'components/primary-hero'
import Section from 'components/content/section'
import HeadingMedium from 'components/text/heading-medium'
import Divider from 'components/content/divider'
import Badge from 'components/buttons/badge'

const WrappedBadge = ({ image = '', link = '' }) => (
  <div>
    <Badge src={image} link={link} />

    <style jsx>{`
      div {
        flex: 1;
        margin: 0 15px;
      }  

      @media screen and (max-width: 500px) {
        div {
          margin: 0 10px;
        }  
      }
    `}</style>
  </div>
)

const Home = ({ featured_image, primary_hero, badges, yoast }) => {
  const { primary_hero_image, primary_hero_title, primary_hero_content } = primary_hero
  const mobileBadges = badges.filter(badge => badge.platform === 'mobile')
  const tvBadges = badges.filter(badge => badge.platform === 'tv')
  const pageTitle = yoast.yoast_wpseo_title || ''

  const mobileBadgesList = mobileBadges.map(badge => (
    <WrappedBadge key={badge.badge.id} image={badge.badge.url} link={badge.link} />
  ))

  const tvBadgesList = tvBadges.map(badge => (
    <WrappedBadge key={badge.badge.id} image={badge.badge.url} link={badge.link} />
  ))

  return (
    <StandardLayout>
      { pageTitle && <Helmet title={pageTitle} /> }

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
        to={'/about'}
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

      <div className='wrapper'>
        <div className='section'>
          <HeadingMedium margin={'0 0 2vw 0'} centered>Stream NewsON from your TV for free</HeadingMedium>
          <Divider />
          <div className='badgeWrapper'>
            { tvBadgesList }
          </div>
        </div>

        <div className='section'>
          <HeadingMedium margin={'0 0 2vw 0'} centered>Stream NewsON from your mobile device for free</HeadingMedium>
          <Divider />
          <div className='badgeWrapper'>
            { mobileBadgesList }
          </div>
        </div>
      </div>

      <style jsx>{`
        div.wrapper {
          background-color: #f8f8f8;
          display: flex;
          flex-direction: row;
          padding: 180px 0 100px 0;
        }  

        div.section {
          align-items: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          padding: 0 8.33333vw;
          text-align: center;
          width: 50%;
        }

        div.badgeWrapper {
          display: flex;
          flex-wrap: wrap;
        }

        @media screen and (min-width: 2000px) {
          div.wrapper {
            padding: 10vw 0 6vw 0;
          }
        }

        @media screen and (max-width: 750px) {
          div.wrapper {
            flex-flow: row wrap;
            padding: 100px 0 60px 0;
          }

          div.section {
            flex: 1 1 100%;
            width: 100%;
          }

          div.section:first-child {
            margin-bottom: 15vw;
          }
        }
      `}</style>
    </StandardLayout>
  )
}

Home.getInitialProps = async ({ reduxStore }) => {
  const { dispatch } = reduxStore
  const data = await Promise.all([
    fetch(`${API_ENDPOINT}/wp/v2/frontpage`).then(response => response.json()),
    fetch(`${API_ENDPOINT}/menus/v1/menus/primary`).then(response => response.json()),
    fetch(`${API_ENDPOINT}/acf/v3/options/acf-options`).then(response => response.json()),
    fetch(`${API_ENDPOINT}/menus/v1/menus/footer`).then(response => response.json())
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

  let badges = [], social = []
  let page_acf = {}, page_yoast = {}

  if (data[0].id) {
    page_acf = await fetch(`${API_ENDPOINT}/acf/v3/pages/${data[0].id}`).then(response => response.json())
    page_yoast = await fetch(`${API_ENDPOINT}/wp/v2/pages/${data[0].id}`).then(response => response.json())
  }

  if (data[2] && data[2].acf && data[2].acf.app_links) {
    badges = data[2].acf.app_links
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

  return {
    page: data[0],
    featured_image: image,
    primary_hero: page_acf && page_acf.acf,
    badges,
    yoast: page_yoast.yoast_meta
  }
}

export default withRedux(Home)
