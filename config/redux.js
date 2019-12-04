import React from 'react'
import { Provider } from 'react-redux'
import { initializeStore } from './store'
import App from 'next/app'

export const withRedux = (PageComponent, { ssr = true } = {}) => {
  const WithRedux = ({ initialReduxState, ...props }) => {
    const store = getOrInitializeStore(initialReduxState)

    return (
      <Provider store={store}>
        <PageComponent {...props} />
      </Provider>
    )
  }

  // Prevent users from using this HOC on _app.js level
  if (process.env.NODE_ENV !== 'production') {
    const isAppHOC = PageComponent === App || PageComponent.prototype instanceof App

    if (isAppHOC) {
      throw new Error('The withRedux HOC only works with Page Components')
    }
  }

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName = PageComponent.displayName || PageComponent.name || 'Component'

    WithRedux.displayName = `withRedux(${displayName})`
  }

  if (ssr || PageComponent.getInitialProps) {
    WithRedux.getInitialProps = async context => {
      const reduxStore = getOrInitializeStore()

      context.reduxStore = reduxStore

      const pageProps = typeof PageComponent.getInitialProps === 'function'
        ? await PageComponent.getInitialProps(context)
        : {}
      
      return {
        ...pageProps,
        initialReduxState: reduxStore.getState()
      }
    }
  }

  return WithRedux
}

let reduxStore

const getOrInitializeStore = (initialState) => {
  if (typeof window === 'undefined') {
    return initializeStore(initialState)
  }

  if (!reduxStore) {
    reduxStore = initializeStore(initialState)
  }

  return reduxStore
}