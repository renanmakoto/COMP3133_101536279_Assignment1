const quirky_mongoose_bucket = require('mongoose')

const pineapple_user_schema = new quirky_mongoose_bucket.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

module.exports = quirky_mongoose_bucket.model('User', pineapple_user_schema)
