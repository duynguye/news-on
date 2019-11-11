import React from 'react'
import { Helmet } from 'react-helmet'

const Head = () => (
  <Helmet>
    <title>Home Page</title>
    <link rel='shortcut icon' type='image/png' href='/favicon.png' />
    <meta name='description' content='Next App' />
  </Helmet>
)

export default Head