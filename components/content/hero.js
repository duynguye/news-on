import React from 'react'

import HeadingLarge from 'components/text/heading-large'
import Paragraph from 'components/text/paragraph'

const Hero = ({ title, content = '' }) => (
  <section>
    <div>
      <HeadingLarge light margin={'0 0 30px 0'}>{ title }</HeadingLarge>
      { content && <Paragraph light>{ content }</Paragraph> }
    </div>

    <style jsx>{`
      section {
        background-color: #004A87;
        background-image: url(https://sbgi118262site.wpengine.com/wp-content/uploads/2019/11/BG-blue.jpg);
        background-size: cover;
        margin-bottom: 64px;
        padding: 65px 8.33333vw;
      }

      div {
        max-width: 41.66667vw;
      }
    `}</style>
  </section>
)

export default Hero