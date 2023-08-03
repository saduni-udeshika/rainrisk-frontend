import { getAuthTokens } from './utils/token'
import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5000',
})

const getConfigWithTokens = (config) => {
  const headers = config?.headers || {}
  headers['authorization'] = `Bearer ${getAuthTokens().authToken}`
  return config != null ? { ...config, headers: headers } : { headers: headers }
}

export const http = {
  get: async (url, config) => {
    return await axiosInstance.get(url, config)
  },
  post: async (url, data, config) => {
    return await axiosInstance.post(url, data, config)
  },
  withToken: {
    get: async (url, config) => {
      return await axiosInstance.get(url, getConfigWithTokens(config))
    },
    post: async (url, data, config) => {
      return await axiosInstance.post(url, data, getConfigWithTokens(config))
    },
  },
}
