import { http } from '../http'

export const calculateEnvironmentalLandslideDamagePercentage = async (
  EnvironmentLandslideDisasterImage,
  disasterType,
  location,
  date,
) => {
  const formData = new FormData()
  formData.append('file', EnvironmentLandslideDisasterImage)
  formData.append('disaster_type', disasterType)
  formData.append('location', location)
  formData.append('date', date)
  
  return http.withToken.post(`predict-image-landslide-environmental`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const getEnvironmentalLandslideDamagePercentage = async () => {
  return http.withToken.get('assessed-landslide-environmental-damage')
}

export const getLandslideDamaged = async (image) => {
  const formData = new FormData()
  formData.append('file', image)
  return http.withToken.post(`predict-landslide-environmental`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

