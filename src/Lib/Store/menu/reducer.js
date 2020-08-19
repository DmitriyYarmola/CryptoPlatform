import * as types from './types'

const initialState = {
  menuData: [],
}

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
