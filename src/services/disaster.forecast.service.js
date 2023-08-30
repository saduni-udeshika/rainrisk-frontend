import { http } from '../http'

export const disasterForecast = async (
  location,
  date,
) => {
  const formData = new FormData()
  formData.append('location', location)
  formData.append('date', date)
  
  return http.withToken.post(`predict-disaster`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}