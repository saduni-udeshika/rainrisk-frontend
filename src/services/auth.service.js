import { http } from '../http'

export const signIn = (email, password) => {
  return http.post(`login`, {
    email: email,
    password: password,
  })
}

export const changePassword = (currentPassword, newPassword) => {
  return http.withToken.post('adminChangePassword', {
    currentPassword,
    newPassword,
  })
}

export const getTokens = async () => {
  return http.withToken.post('getTokens')
}

export const signUp = async (signUpObject) => {
  return http.post('signup', signUpObject)
}

export const getUser = async () => {
  return http.withToken.get('get-user')
}
