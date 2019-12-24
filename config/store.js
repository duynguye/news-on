import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = {
  menu: {},
  footer: {},
  social: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MENU':
      return {
        ...state,
        menu: action.menu
      }

    case 'SET_SOCIAL':
      return {
        ...state,
        social: action.social
      }

    case 'SET_FOOTER':
      return {
        ...state,
        footer: action.footer
      }

    default:
      return state
  }
}

export const initializeStore = (preloadedState = initialState) => {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  )
}