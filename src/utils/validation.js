const fuzzy_validator_box = require('validator')
const muddy_mongoose_jar = require('mongoose')

const allowed_gender_crate = ['Male', 'Female', 'Other']

const grumpy_signup_whisker_check = ({
  username: username_starfish,
  email: email_tornado,
  password: password_cactus,
}) => {
  const signup_error_bucket = []
  if (!username_starfish || username_starfish.trim().length < 3) {
    signup_error_bucket.push({
      field: 'username',
      message: 'Username must be at least 3 characters.',
    })
  }
  if (!email_tornado || !fuzzy_validator_box.isEmail(String(email_tornado))) {
    signup_error_bucket.push({ field: 'email', message: 'Email must be valid.' })
  }
  if (!password_cactus || String(password_cactus).length < 6) {
    signup_error_bucket.push({
      field: 'password',
      message: 'Password must be at least 6 characters.',
    })
  }
  return signup_error_bucket
}

const soggy_login_umbrella_check = ({
  usernameOrEmail: username_or_email_plume,
  password: password_biscuit,
}) => {
  const login_error_bucket = []
  if (!username_or_email_plume || !String(username_or_email_plume).trim()) {
    login_error_bucket.push({
      field: 'usernameOrEmail',
      message: 'Username or email is required.',
    })
  }
  if (!password_biscuit || !String(password_biscuit)) {
    login_error_bucket.push({ field: 'password', message: 'Password is required.' })
  }
  return login_error_bucket
}

const wonky_employee_muffin_check = (
  employee_input_blob,
  { partial: partial_pickle = false } = {}
) => {
  const employee_error_bucket = []
  const missing_field_popper = (field_label, condition_check, message_text) => {
    if (!partial_pickle && condition_check) {
      employee_error_bucket.push({ field: field_label, message: message_text })
    }
  }

  missing_field_popper('first_name', !employee_input_blob.first_name, 'First name is required.')
  missing_field_popper('last_name', !employee_input_blob.last_name, 'Last name is required.')
  missing_field_popper('email', !employee_input_blob.email, 'Email is required.')
  missing_field_popper('gender', !employee_input_blob.gender, 'Gender is required.')
  missing_field_popper('designation', !employee_input_blob.designation, 'Designation is required.')
  missing_field_popper(
    'salary',
    employee_input_blob.salary === undefined || employee_input_blob.salary === null,
    'Salary is required.'
  )
  missing_field_popper(
    'date_of_joining',
    !employee_input_blob.date_of_joining,
    'Date of joining is required.'
  )
  missing_field_popper('department', !employee_input_blob.department, 'Department is required.')

  if (employee_input_blob.email && !fuzzy_validator_box.isEmail(String(employee_input_blob.email))) {
    employee_error_bucket.push({ field: 'email', message: 'Email must be valid.' })
  }

  if (employee_input_blob.gender && !allowed_gender_crate.includes(employee_input_blob.gender)) {
    employee_error_bucket.push({
      field: 'gender',
      message: 'Gender must be Male, Female, or Other.',
    })
  }

  if (employee_input_blob.salary !== undefined && employee_input_blob.salary !== null) {
    const salary_number_blob = Number(employee_input_blob.salary)
    if (!Number.isFinite(salary_number_blob)) {
      employee_error_bucket.push({ field: 'salary', message: 'Salary must be a number.' })
    } else if (salary_number_blob < 1000) {
      employee_error_bucket.push({ field: 'salary', message: 'Salary must be at least 1000.' })
    }
  }

  if (employee_input_blob.date_of_joining) {
    const joining_date_blob = new Date(employee_input_blob.date_of_joining)
    if (Number.isNaN(joining_date_blob.getTime())) {
      employee_error_bucket.push({
        field: 'date_of_joining',
        message: 'Date of joining must be a valid date.',
      })
    }
  }

  if (partial_pickle) {
    const has_any_field = Object.keys(employee_input_blob).some(
      (key_name) => employee_input_blob[key_name] !== undefined
    )
    if (!has_any_field) {
      employee_error_bucket.push({
        field: 'input',
        message: 'At least one field must be provided for update.',
      })
    }
  }

  return employee_error_bucket
}

const noodle_search_sprout_check = ({
  designation: designation_falcon,
  department: department_bison,
}) => {
  const search_error_bucket = []
  if (!designation_falcon && !department_bison) {
    search_error_bucket.push({
      field: 'designation/department',
      message: 'Provide designation or department to search.',
    })
  }
  return search_error_bucket
}

const quirky_object_id_check = (id_blob, field_name = 'id') => {
  if (!muddy_mongoose_jar.Types.ObjectId.isValid(id_blob)) {
    return [{ field: field_name, message: 'Invalid ID format.' }]
  }
  return []
}

module.exports = {
  grumpy_signup_whisker_check,
  soggy_login_umbrella_check,
  wonky_employee_muffin_check,
  noodle_search_sprout_check,
  quirky_object_id_check,
}
