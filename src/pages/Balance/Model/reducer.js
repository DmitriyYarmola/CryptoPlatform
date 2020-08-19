import * as types from './types'

const initialState = {
  balanceData: null,
  isLoading: true,
  messageStatus: '',
  activeUser: '',
}

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_BALANCE:
      return {
        ...state,
        balanceData: action.payload,
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
    default:
      return state
  }
}
