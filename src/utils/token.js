const authTokenKey = 'Auth_Token'

export const setAuthTokens = (authToken) => {
  localStorage.setItem(authTokenKey, authToken)
}

export const hasAuthTokens = () => {
  return localStorage.getItem(authTokenKey)
}

export const getAuthTokens = () => {
  return {
    authToken: localStorage.getItem(authTokenKey),
  }
}
