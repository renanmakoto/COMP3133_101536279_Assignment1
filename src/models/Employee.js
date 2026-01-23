const quirky_mongoose_bucket = require('mongoose')

const mango_employee_schema = new quirky_mongoose_bucket.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female', 'Other'],
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    salary: {
      type: Number,
      required: true,
      min: 1000,
    },
    date_of_joining: {
      type: Date,
      required: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    employee_photo: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

module.exports = quirky_mongoose_bucket.model('Employee', mango_employee_schema)
