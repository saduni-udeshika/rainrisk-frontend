import { http } from '../http'

export const calculateDamagePercentage = async (
  preDisasterImage,
  postDisasterImage,
  disasterType,
  location,
  date,
) => {
  const formData = new FormData()
  formData.append('file1', preDisasterImage)
  formData.append('file2', postDisasterImage)
  formData.append('disaster_type', disasterType)
  formData.append('location', location)
  formData.append('date', date)

  return http.withToken.post(`percentage`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const getAssessed = async () => {
  return http.withToken.get('assessed')
}

export const getDamaged = async (image) => {
  const formData = new FormData()
  formData.append('file', image)
  return http.withToken.post(`predict`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
