import { createInstance } from '../../api'

export const signIn = authData => {
  return createInstance().post('user/signin', authData)
}
