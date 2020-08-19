import * as types from './types'

const initialState = {
  isLoading: false,
  notificationDetails: '',
  invalidCredentials: false,
  isAuthenticated: false,
  token: null,
  merchants: null,
}

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    case types.SET_NOTIFICATION_DETAILS:
      return {
        ...state,
        notificationDetails: action.payload,
      }
    case types.SET_INVALID_CREDENTIALS:
      return {
        ...state,
        invalidCredentials: action.payload,
      }
    case types.SET_AUTETHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      }
    case types.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      }
    case types.SET_MERCHANTS:
      return {
        ...state,
        merchants: action.payload,
      }
    default:
      return state
  }
}
