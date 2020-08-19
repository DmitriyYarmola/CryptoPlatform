import * as types from './types'

const initialState = {
  notifications: null,
  isLoading: true,
  notFound: false,
}

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    case types.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      }
    case types.SET_NOT_FOUND:
      return {
        ...state,
        notFound: action.payload,
      }
    default:
      return state
  }
}
