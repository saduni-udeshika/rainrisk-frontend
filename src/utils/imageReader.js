export const getImageFromFile = (file) => {
  return new Promise((resolve) => {
    var reader = new FileReader()
    reader.onloadend = function () {
      resolve(reader.result)
    }
    return reader.readAsDataURL(file)
  })
}
