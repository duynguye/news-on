import React from 'react'
import Swiper from 'react-id-swiper'

import 'swiper/css/swiper.css'

const title = 'Our Partners'
const content = 'NewsON partners with 16 station groups to provide viewers with free access to live and on-demand newscasts from over 280 stations in over 160 U.S. markets, covering more than 96% of the U.S. population. Participating station groups include ABC Owned Television Station Group, Berkshire Hathaway, Cox Media Group, Dispatch Broadcast Group, Fort Myers Broadcasting Company, Forum Communications, Graham Media Group, Gray Television, Hearst Television, Heritage Broadcasting Company, Hubbard Broadcasting, McKinnon Broadcasting, Meredith Corporation, Sinclair Broadcast Group, and TEGNA. We are always working to expand our roster of local TV stations to provide as many options as possible for our viewers. '

const PartnersSlider = ({ partners }) => {
  const params = {
    autoplay: {
      delay: 0
    },
    direction: 'horizontal',
    loop: true,
    speed: 3000,
    slidesPerView: 1,
    spaceBetween: 30,

    breakpoints: {
      500: {
        slidesPerView: 2,
      },

      900: {
        slidesPerView: 4
      }
    }
  }

  const partnersList = partners.map(partner => {
    let linkProps = {
      target: '_blank'
    }

    if (partner.acf.partner_link) {
      linkProps = {
        ...linkProps,
        href: partner.acf.partner_link
      }
    }

    return (
      <div key={partner.id}>
        <a {...linkProps}>
          <img src={partner.fimg_url} alt={''} />
        </a>
  
        <style jsx>{`
          div {
            background-color: #ffffff;
            width: 25%;
          }
  
          a {
            align-items: center;
            display: flex;
            height: 100%;
            justify-content: center;
            padding: 30px;
            width: 100%;
          }
  
          img {
            height: auto;
            object-fit: contain;
            width: auto;
          }
        `}</style>
      </div>
    )
  })

  return (
    <>
      <Swiper containerClass='partners-container' {...params}>
        { partnersList }
      </Swiper>

      <style jsx global>{`
        .partners-container {
          height: 150px;
          margin: 0 auto;
          width: ${8.33333 * 10}vw;
        }

        .swiper-wrapper {
          transition-timing-function: ease-in-out;
        }

        @media screen and (min-width: 2000px) {
          .partners-container {
            height: 10vw;
          }
        }
      `}</style>
    </>
  )
}

const PartnersModule = ({ title, content, partners }) => {
  return (
    <section>
      <div className='title'>
        <h2>{ title }</h2>
      </div>

      <div className='content' dangerouslySetInnerHTML={{ __html: content }} />

      <PartnersSlider partners={partners} />

      <style jsx>{`
        section {
          align-items: center;
          background: #F2F9FF;
          display: flex;
          flex-direction: column;
          padding: 80px 0;
        }

        div.title {
          text-align: center;
          width: ${8.33333 * 3}vw;
        } 

        div.content {
          margin-bottom: 50px;
          width: 50vw;
        }

        p {
          margin-bottom: 0;
        }

        @media screen and (min-width: 2000px) {
          section {
            padding: 5vw 0;
          }

          h2 {
            margin-bottom: 2vw;
          }
        }

        @media screen and (max-width: 500px) {
          section {
            padding: 40px 0;
          }

          div.title {
            margin-bottom: -30px;
            padding: 0 8.33333vw;
            width: 100%;
          }

          div.content {
            margin-bottom: 20px;
            padding: 8.33333vw;
            width: 100%;
          }
        }
      `}</style>
    </section>
  )
}

export default PartnersModule