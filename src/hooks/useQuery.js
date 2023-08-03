import { useState } from 'react'

const awaitSleep = (duration) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve()
    }, duration),
  )
export const useQuery = (query, queryKey) => {
  const [queryStatus, setQueryStatus] = useState({
    isLoading: false,
  })

  const call = async (...params) => {
    let data
    let error
    try {
      if (queryKey) {
        const storageData = localStorage.getItem(queryKey)
        if (storageData) {
          setQueryStatus({ ...queryStatus, isLoading: true })
          await awaitSleep(250)
          data = JSON.parse(storageData)
          setQueryStatus({ ...queryStatus, response: data })
          return { response: data, error }
        }
      }
      setQueryStatus({ ...queryStatus, isLoading: true })
      const response = await query(...params)
      setQueryStatus({ isLoading: false, response: response.data })
      data = response.data
      if (queryKey) {
        localStorage.setItem(queryKey, JSON.stringify(data))
      }
    } catch (err) {
      error = err
      setQueryStatus({ isLoading: false, error: err })
    }
    return { response: data, error }
  }

  return { ...queryStatus, call }
}
