import * as types from './types'

const initialState = {
  address: '',
  isLoading: false,
  transactions: [],
  showResult: false,
}

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ADDRESS:
      return {
        ...state,
        address: action.payload,
      }
    case types.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    case types.SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
      }
    case types.SHOW_RESULT:
      return {
        ...state,
        showResult: action.payload,
      }
    default:
      return state
  }
}
