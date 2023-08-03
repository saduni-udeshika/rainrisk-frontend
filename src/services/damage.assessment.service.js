import {http} from '../http'

export const calculateDamagePercentage = (preDisasterImage, postDisasterImage) => {
    return http.post(`calculateDamagePercentage`, {
        img1: preDisasterImage,
        img2: postDisasterImage,
    })
  }