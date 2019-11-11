import React from 'react'
import { useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'
import { withRedux } from 'config/redux'
import StandardLayout from 'layouts/standard-layout'
import { API_ENDPOINT } from 'config'

const Page = (props) => {
  const router = useRouter();

  return (
    <StandardLayout>
      <h1></h1>
    </StandardLayout>
  )
}

Page.getInitialProps = async ({ query, reduxStore }) => {
  const { dispatch } = reduxStore
  const data = await Promise.all([
    fetch(`${API_ENDPOINT}/wp/v2/pages?slug=${query.id}`).then(response => response.json()),
    fetch(`${API_ENDPOINT}/menus/v1/menus/primary`).then(response => response.json())
  ])

  dispatch({
    type: 'SET_MENU',
    menu: data[1]
  })

  return {
    page: data[0][0]
  }
}

export default withRedux(Page)
