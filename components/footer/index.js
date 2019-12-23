import '@babel/polyfill'
import React from 'react'
import Link from 'next/link'

const FooterLink = ({ to, children }) => (
  <li>
    <Link href={to}>
      <a>{ children }</a>
    </Link>

    <style jsx>{`
      li {
        list-style: none;
        margin: 0 20px 20px;
      }

      a {
        color: #ffffff;
        font-family: 'Brandon Text', sans-serif;
        font-weight: 400;
        text-decoration: none;
      }

      @media screen and (min-width: 2000px) {
        li {
          margin: 0 1.75vw 20px;
        }

        a {
          font-size: 0.9vw;
        }
      }
      
      @media screen and (max-width: 500px) {
        a {
          font-size: 14px;
        }  
      }
    `}</style>
  </li>
)

const Footer = () => (
  <footer>
    <div className={'navigation'}>
      <Link href={`/`}>
        <a><img src='https://sbgi118262site.wpengine.com/wp-content/uploads/2019/11/logo_white@2x.png' /></a>
      </Link>

      <ul>
        <FooterLink to='/about'>About</FooterLink>
        <FooterLink to='/news'>News</FooterLink>
        <FooterLink to='/advertise'>Advertise</FooterLink>
        <FooterLink to='/contact'>Contact</FooterLink>
        <FooterLink to='/about#careers'>Careers</FooterLink>
        <FooterLink to='/privacy-policy'>Privacy Policy</FooterLink>
        <FooterLink to='/terms-of-service'>Terms of Service</FooterLink>
      </ul>
    </div>

    <div className={'copyright'}>
      <span>© Copyright 2019 All Rights Reserved</span>
      <span>Designed by <a href='https://compulse.com' target='_blank'>Compulse</a></span>
    </div>

    <style jsx>{`
      footer {
        display: flex;
        flex-direction: column;
      }

      div.navigation {
        align-items: center;
        background-color: #004A87;
        display: flex;
        flex-direction: column;
        padding: 40px 0;
      }

      img {
        height: 70px;
        margin-bottom: 40px;
        width: auto;
      }

      div.copyright {
        background-color: #001425;
        color: white;
        display: flex;
        justify-content: space-between;
        padding: 10px 8.33333vw;
      }

      span {
        font-family: 'Brandon Text', sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 17px;
      }

      a { 
        color: white;
        text-decoration: none;
      }

      ul {
        display: flex;
        flex-direction: row;
        flex-flow: row wrap;
        justify-content: center;
        margin: 0 0 -20px;
        padding: 0;
      }

      @media screen and (min-width: 2000px) {
        img {
          height: 120px;
          margin-bottom: 100px;
        }

        div.navigation {
          padding: 3vw 0;
        }

        div.copyright {
          padding: 1.1vw 8.33333vw;
        }

        span {
          font-size: 0.8vw;
          line-height: 1;
        }
      }

      @media screen and (max-width: 500px) {
        div.copyright {
          padding: ${8.33333 / 2}vw;
        }

        span {
          font-size: 14px;
        }

        div.copyright span:last-child {
          text-align: right;
        }  
      }
    `}</style>
  </footer>
)

export default Footer