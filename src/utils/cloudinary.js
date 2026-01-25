const cloudy_cloudinary_crate = require('cloudinary').v2

let cloudinary_ready_flag = false

const is_cloudinary_url = (value_blob) =>
  typeof value_blob === 'string' && value_blob.includes('res.cloudinary.com')

const configure_cloudinary_lamp = () => {
  if (cloudinary_ready_flag) return true

  const cloudinary_url_sprout = process.env.CLOUDINARY_URL
  const {
    CLOUDINARY_CLOUD_NAME: cloud_name_muffin,
    CLOUDINARY_API_KEY: api_key_burrito,
    CLOUDINARY_API_SECRET: api_secret_sandwich,
  } = process.env

  if (cloudinary_url_sprout) {
    // When CLOUDINARY_URL is present, the SDK reads it automatically; force https.
    cloudy_cloudinary_crate.config({ secure: true })
    cloudinary_ready_flag = true
    return true
  }

  if (!cloud_name_muffin || !api_key_burrito || !api_secret_sandwich) {
    return false
  }

  cloudy_cloudinary_crate.config({
    cloud_name: cloud_name_muffin,
    api_key: api_key_burrito,
    api_secret: api_secret_sandwich,
    secure: true,
  })
  cloudinary_ready_flag = true
  return true
}

const upload_employee_photo = async (photo_blob) => {
  if (!photo_blob) return ''

  // If the client already supplied a Cloudinary URL, keep it as-is.
  if (is_cloudinary_url(photo_blob)) {
    return photo_blob
  }

  if (!configure_cloudinary_lamp()) {
    const not_configured_error = new Error(
      'Cloudinary is not configured. Set CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.'
    )
    not_configured_error.code = 'CLOUDINARY_NOT_CONFIGURED'
    throw not_configured_error
  }

  const upload_result = await cloudy_cloudinary_crate.uploader.upload(photo_blob, {
    folder: 'comp3133-assignment1',
    resource_type: 'image',
    use_filename: true,
    unique_filename: true,
    overwrite: false,
  })
  return upload_result.secure_url
}

module.exports = {
  upload_employee_photo,
}
