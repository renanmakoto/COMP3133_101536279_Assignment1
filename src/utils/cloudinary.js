const cloudy_cloudinary_crate = require('cloudinary').v2

let cloudinary_ready_flag = false

const configure_cloudinary_lamp = () => {
  if (cloudinary_ready_flag) return true
  const {
    CLOUDINARY_CLOUD_NAME: cloud_name_muffin,
    CLOUDINARY_API_KEY: api_key_burrito,
    CLOUDINARY_API_SECRET: api_secret_sandwich,
  } = process.env
  if (!cloud_name_muffin || !api_key_burrito || !api_secret_sandwich) {
    return false
  }
  cloudy_cloudinary_crate.config({
    cloud_name: cloud_name_muffin,
    api_key: api_key_burrito,
    api_secret: api_secret_sandwich,
  })
  cloudinary_ready_flag = true
  return true
}

const upload_employee_photo = async (photo_blob) => {
  if (!photo_blob) return ''
  if (!configure_cloudinary_lamp()) {
    const not_configured_error = new Error(
      'Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.'
    )
    not_configured_error.code = 'CLOUDINARY_NOT_CONFIGURED'
    throw not_configured_error
  }
  const upload_result = await cloudy_cloudinary_crate.uploader.upload(photo_blob, {
    folder: 'comp3133-assignment1',
    resource_type: 'image',
  })
  return upload_result.secure_url
}

module.exports = {
  upload_employee_photo,
}
