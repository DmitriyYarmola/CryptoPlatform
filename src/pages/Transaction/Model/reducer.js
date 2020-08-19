import * as types from './types'

const initialState = {
  transaction: null,
  isLoading: true,
  messageStatus: '',
  offsetId: null,
  activeUser: null,
  userTransactions: null,
}

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_TRANSACTION:
      return {
        ...state,
        transaction: action.payload,
      }
    case types.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    case types.SET_STATUS_MESSAGE:
      return {
        ...state,
        messageStatus: action.payload,
      }
    case types.SET_ACTIVE_USER:
      return {
        ...state,
        activeUser: action.payload,
      }
    case types.SET_USER_TRANSACTIONS:
      return {
        ...state,
        transaction: action.payload,
      }
    default:
      return state
  }
}
