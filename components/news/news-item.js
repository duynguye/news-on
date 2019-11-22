import React from 'react'
import Link from 'next/link'
import HeadingSmall from 'components/text/heading-small'

const NewsItem = ({ title, date, excerpt, image, link }) => (
  <li>
    <Link href={`/news${link}`}>
      <a>
        <img src={image.src} alt={image.alt} />
        <HeadingSmall margin={`0 0 5px 0`}>{ title }</HeadingSmall>
        <span>{ date }</span>
        <p>{ excerpt }</p>
      </a>
    </Link>

    <style jsx>{`
      li {
        height: auto;
        margin: 0 15px 30px;
        width: calc(${100 / 3}% - 30px);
      }

      @media screen and (max-width: 1100px) {
        li {
          width: calc(${100 / 2}% - 30px);
        }
      }

      @media screen and (max-width: 650px) {
        li {
          width: 100%;
        }
      }

      a {
        background: #ffffff;
        box-shadow: 0 2px 70px 0 rgba(0, 74, 135, 0.08);
        display: block;
        height: calc(100% - 35px);
        margin-top: 35px;
        padding: 0 35px 35px;
        text-decoration: none;
        transition: box-shadow 0.2s ease;
        width: 100%;
      }

      span {
        color: #99a0ac;
        display: block;
        font-family: 'Brandon Text', sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 17px;
        margin-bottom: 20px;
      }

      p {
        color: #001329;
        font-family: 'Brandon Text', sans-serif;
        font-weight: 400;
        font-size: 15px;
        line-height: 24px;
        margin-bottom: 0;
      }

      a:hover {
        text-decoration: none;
        box-shadow: 0 2px 70px 0 rgba(0, 74, 135, 0.38);
      }

      img {
        box-shadow: 0 2px 70px 0 rgba(0, 0, 0, 0.1);
        display: inline-block;
        height: 250px;
        object-fit: cover;
        margin-top: -35px;
        margin-bottom: 40px;
        width: 100%;  
      }
    `}</style>
  </li>
)

export default NewsItem