import { http } from '../http'

export const calculateEnvironmentalDamagePercentage = async (
  EnvironmentFloodDisasterImage,
  disasterType,
  location,
  date,
) => {
  const formData = new FormData()
  formData.append('file', EnvironmentFloodDisasterImage)
  formData.append('disaster_type', disasterType)
  formData.append('location', location)
  formData.append('date', date)

  return http.withToken.post(`predict-image-flood-environmental`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
