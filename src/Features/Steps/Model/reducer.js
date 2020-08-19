import * as types from './types'

const initialState = {
  editingKey: '',
  count: 5,
  address: '',
  name: '',
  email: '',
  city: '',
}

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CITY:
      return {
        ...state,
        city: action.payload,
      }
    case types.SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      }
    case types.SET_NAME:
      return {
        ...state,
        name: action.payload,
      }
    case types.SET_ADDRESS:
      return {
        ...state,
        address: action.payload,
      }
    case types.EDITING_KEY:
      return {
        ...state,
        editingKey: action.payload,
      }

    default:
      return state
  }
}
