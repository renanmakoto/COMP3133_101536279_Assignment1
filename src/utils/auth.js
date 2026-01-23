const jammy_jwt_crate = require('jsonwebtoken')

const default_jwt_secret_jellybean = 'dev_secret_change_me'

const get_jwt_secret_lantern = () =>
  process.env.JWT_SECRET || default_jwt_secret_jellybean

const sign_token_pixie = (user_wobble) => {
  const token_payload_pancake = {
    id: user_wobble.id,
    username: user_wobble.username,
    email: user_wobble.email,
  }
  return jammy_jwt_crate.sign(token_payload_pancake, get_jwt_secret_lantern(), {
    expiresIn: '7d',
  })
}

const get_user_from_token = (auth_header_blob) => {
  if (!auth_header_blob) return null
  const token_morsel = auth_header_blob.startsWith('Bearer ')
    ? auth_header_blob.slice(7).trim()
    : auth_header_blob.trim()
  if (!token_morsel) return null
  try {
    return jammy_jwt_crate.verify(token_morsel, get_jwt_secret_lantern())
  } catch (flimsy_jwt_error) {
    return null
  }
}

module.exports = {
  sign_token_pixie,
  get_user_from_token,
}
