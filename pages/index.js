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

const WrappedBadge = ({ image = '', link = '', alt = '' }) => (
  <div>
    <Badge src={image} link={link} alt={alt} />

    <style jsx>{`
      div {
        flex: 1 1 auto;
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

const Home = ({ featured_image, primary_hero, badges, yoast, page_acf }) => {
  const { primary_hero_image, primary_hero_title, primary_hero_content } = primary_hero
  const mobileBadges = badges.filter(badge => badge.platform === 'mobile')
  const tvBadges = badges.filter(badge => badge.platform === 'tv')
  const pageTitle = yoast.yoast_wpseo_title || ''
  const { acf = {} } = page_acf

  console.log(badges)

  const {
    tv_app_title = '',
    mobile_app_title = '',
    home_section_1 = {},
    home_section_2 = {}
  } = acf

  const mobileBadgesList = mobileBadges.map(badge => (
    <WrappedBadge key={badge.badge.id} image={badge.badge.url} link={badge.link} alt={badge.badge.alt} />
  ))

  const tvBadgesList = tvBadges.map(badge => (
    <WrappedBadge key={badge.badge.id} image={badge.badge.url} link={badge.link} alt={badge.badge.alt} />
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
        background={home_section_1.background_image.url}
        backgroundAlt={home_section_1.background_image.alt}
        foreground={home_section_1.image.url}
        foregroundAlt={home_section_1.image.alt}
        title={home_section_1.title}
        content={home_section_1.content}
        centered={home_section_1.centered}
        to={home_section_1.link}
      />
      
      <Section 
        background={home_section_2.background_image.url}
        backgroundAlt={home_section_2.background_image.alt}
        foreground={home_section_2.image.url}
        foregroundAlt={home_section_2.image.alt}
        foregroundSpecial={true}
        reverse
        title={home_section_2.title}
        content={home_section_2.content}
        centered={home_section_2.centered}
        titleSize={'small'}
      />

      <div className='wrapper'>
        <div className='section'>
          <HeadingMedium margin={'0 0 2vw 0'} centered>{ tv_app_title }</HeadingMedium>
          <Divider />
          <div className='badgeWrapper'>
            { tvBadgesList }
          </div>
        </div>

        <div className='section'>
          <HeadingMedium margin={'0 0 2vw 0'} centered>{ mobile_app_title }</HeadingMedium>
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
    yoast: page_yoast.yoast_meta,
    page_acf
  }
}

export default withRedux(Home)
