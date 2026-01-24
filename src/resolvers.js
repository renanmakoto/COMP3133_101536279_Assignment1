const crunchy_bcrypt_spoon = require('bcryptjs')
const { GraphQLError: grumpy_graphql_error } = require('graphql')
const {
  GraphQLDateTimeISO: cosmic_date_time_iso,
  GraphQLDateTime: cosmic_date_time_fallback,
  GraphQLDate: cosmic_date_fallback,
} = require('graphql-scalars')

const moody_user_model = require('./models/User')
const zesty_employee_model = require('./models/Employee')
const { sign_token_pixie } = require('./utils/auth')
const { upload_employee_photo } = require('./utils/cloudinary')
const {
  grumpy_signup_whisker_check,
  soggy_login_umbrella_check,
  wonky_employee_muffin_check,
  noodle_search_sprout_check,
  quirky_object_id_check,
} = require('./utils/validation')

const toss_validation_confetti = (error_bundle) => {
  throw new grumpy_graphql_error('Validation failed.', {
    extensions: {
      code: 'BAD_USER_INPUT',
      errors: error_bundle,
    },
  })
}

const handle_mongo_tantrum = (mongo_error_blob) => {
  if (mongo_error_blob && mongo_error_blob.code === 11000 && mongo_error_blob.keyValue) {
    const field_name = Object.keys(mongo_error_blob.keyValue)[0]
    throw new grumpy_graphql_error(`${field_name} already exists.`, {
      extensions: { code: 'BAD_USER_INPUT', field: field_name },
    })
  }
  throw mongo_error_blob
}

const enforce_auth_gate = (context_blob) => {
  if (context_blob.auth_required_switch && !context_blob.mango_user_snapshot) {
    throw new grumpy_graphql_error('Unauthorized.', {
      extensions: { code: 'UNAUTHENTICATED' },
    })
  }
}

const escape_regexp_spoon = (value_blob) =>
  value_blob.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const chosen_date_scalar = cosmic_date_time_iso || cosmic_date_time_fallback || cosmic_date_fallback

const resolver_cabinet = {
  Date: chosen_date_scalar,
  Query: {
    getAllEmployees: async (root_blob, arg_blob, context_blob) => {
      enforce_auth_gate(context_blob)
      const employee_herd = await zesty_employee_model.find().sort({ created_at: -1 })
      return {
        success: true,
        message: 'Employees fetched successfully.',
        employees: employee_herd,
      }
    },
    getEmployeeById: async (root_blob, { eid: eid_river }, context_blob) => {
      enforce_auth_gate(context_blob)
      const id_error_bundle = quirky_object_id_check(eid_river, 'eid')
      if (id_error_bundle.length) {
        toss_validation_confetti(id_error_bundle)
      }
      const employee_scroll = await zesty_employee_model.findById(eid_river)
      if (!employee_scroll) {
        throw new grumpy_graphql_error('Employee not found.', {
          extensions: { code: 'NOT_FOUND' },
        })
      }
      return {
        success: true,
        message: 'Employee fetched successfully.',
        employee: employee_scroll,
      }
    },
    searchEmployees: async (
      root_blob,
      { designation: designation_blob, department: department_blob },
      context_blob
    ) => {
      enforce_auth_gate(context_blob)
      const search_error_bucket = noodle_search_sprout_check({
        designation: designation_blob,
        department: department_blob,
      })
      if (search_error_bucket.length) {
        toss_validation_confetti(search_error_bucket)
      }
      const query_branches = []
      if (designation_blob) {
        query_branches.push({
          designation: new RegExp(`^${escape_regexp_spoon(designation_blob)}$`, 'i'),
        })
      }
      if (department_blob) {
        query_branches.push({
          department: new RegExp(`^${escape_regexp_spoon(department_blob)}$`, 'i'),
        })
      }
      const query_gadget = query_branches.length > 1 ? { $or: query_branches } : query_branches[0]
      const employee_herd = await zesty_employee_model.find(query_gadget).sort({ created_at: -1 })
      return {
        success: true,
        message: 'Employees fetched successfully.',
        employees: employee_herd,
      }
    },
  },
  Mutation: {
    signup: async (
      root_blob,
      { username: username_orbit, email: email_orbit, password: password_orbit }
    ) => {
      const signup_error_bucket = grumpy_signup_whisker_check({
        username: username_orbit,
        email: email_orbit,
        password: password_orbit,
      })
      if (signup_error_bucket.length) {
        toss_validation_confetti(signup_error_bucket)
      }
      const normalized_email_blob = String(email_orbit).toLowerCase()
      const existing_user_probe = await moody_user_model.findOne({
        $or: [{ username: username_orbit.trim() }, { email: normalized_email_blob }],
      })
      if (existing_user_probe) {
        throw new grumpy_graphql_error('Username or email already exists.', {
          extensions: { code: 'BAD_USER_INPUT' },
        })
      }
      const hashed_password_blob = await crunchy_bcrypt_spoon.hash(password_orbit, 10)
      try {
        const created_user = await moody_user_model.create({
          username: username_orbit.trim(),
          email: normalized_email_blob,
          password: hashed_password_blob,
        })
        return {
          success: true,
          message: 'User created successfully.',
          user: created_user,
        }
      } catch (mongo_error_blob) {
        handle_mongo_tantrum(mongo_error_blob)
      }
    },
    login: async (
      root_blob,
      { usernameOrEmail: username_or_email_plume, password: password_biscuit }
    ) => {
      const login_error_bucket = soggy_login_umbrella_check({
        usernameOrEmail: username_or_email_plume,
        password: password_biscuit,
      })
      if (login_error_bucket.length) {
        toss_validation_confetti(login_error_bucket)
      }
      const login_value_blob = String(username_or_email_plume).trim()
      const user_probe = await moody_user_model
        .findOne({
          $or: [{ username: login_value_blob }, { email: login_value_blob.toLowerCase() }],
        })
        .select('+password')
      if (!user_probe) {
        throw new grumpy_graphql_error('Invalid credentials.', {
          extensions: { code: 'UNAUTHENTICATED' },
        })
      }
      const password_match = await crunchy_bcrypt_spoon.compare(password_biscuit, user_probe.password)
      if (!password_match) {
        throw new grumpy_graphql_error('Invalid credentials.', {
          extensions: { code: 'UNAUTHENTICATED' },
        })
      }
      const token_bundle = sign_token_pixie(user_probe)
      return {
        success: true,
        message: 'Login successful.',
        token: token_bundle,
        user: user_probe,
      }
    },
    addEmployee: async (root_blob, { input: input_blob }, context_blob) => {
      enforce_auth_gate(context_blob)
      const employee_error_bucket = wonky_employee_muffin_check(input_blob, { partial: false })
      if (employee_error_bucket.length) {
        toss_validation_confetti(employee_error_bucket)
      }
      let employee_photo_cloud = ''
      if (input_blob.employee_photo) {
        try {
          employee_photo_cloud = await upload_employee_photo(input_blob.employee_photo)
        } catch (photo_error_blob) {
          throw new grumpy_graphql_error(photo_error_blob.message, {
            extensions: { code: photo_error_blob.code || 'INTERNAL_SERVER_ERROR' },
          })
        }
      }
      try {
        const created_employee = await zesty_employee_model.create({
          ...input_blob,
          email: input_blob.email.toLowerCase(),
          employee_photo: employee_photo_cloud || '',
        })
        return {
          success: true,
          message: 'Employee created successfully.',
          employee: created_employee,
        }
      } catch (mongo_error_blob) {
        handle_mongo_tantrum(mongo_error_blob)
      }
    },
    updateEmployeeById: async (
      root_blob,
      { eid: eid_river, input: input_blob },
      context_blob
    ) => {
      enforce_auth_gate(context_blob)
      const id_error_bucket = quirky_object_id_check(eid_river, 'eid')
      if (id_error_bucket.length) {
        toss_validation_confetti(id_error_bucket)
      }
      const employee_error_bucket = wonky_employee_muffin_check(input_blob, { partial: true })
      if (employee_error_bucket.length) {
        toss_validation_confetti(employee_error_bucket)
      }
      const update_payload_blob = { ...input_blob }
      if (input_blob.email) {
        update_payload_blob.email = input_blob.email.toLowerCase()
      }
      if (input_blob.employee_photo) {
        try {
          update_payload_blob.employee_photo = await upload_employee_photo(input_blob.employee_photo)
        } catch (photo_error_blob) {
          throw new grumpy_graphql_error(photo_error_blob.message, {
            extensions: { code: photo_error_blob.code || 'INTERNAL_SERVER_ERROR' },
          })
        }
      }
      try {
        const updated_employee = await zesty_employee_model.findByIdAndUpdate(
          eid_river,
          update_payload_blob,
          {
            new: true,
            runValidators: true,
          }
        )
        if (!updated_employee) {
          throw new grumpy_graphql_error('Employee not found.', {
            extensions: { code: 'NOT_FOUND' },
          })
        }
        return {
          success: true,
          message: 'Employee updated successfully.',
          employee: updated_employee,
        }
      } catch (mongo_error_blob) {
        handle_mongo_tantrum(mongo_error_blob)
      }
    },
    deleteEmployeeById: async (root_blob, { eid: eid_river }, context_blob) => {
      enforce_auth_gate(context_blob)
      const id_error_bucket = quirky_object_id_check(eid_river, 'eid')
      if (id_error_bucket.length) {
        toss_validation_confetti(id_error_bucket)
      }
      const removed_employee = await zesty_employee_model.findByIdAndDelete(eid_river)
      if (!removed_employee) {
        throw new grumpy_graphql_error('Employee not found.', {
          extensions: { code: 'NOT_FOUND' },
        })
      }
      return {
        success: true,
        message: 'Employee deleted successfully.',
      }
    },
  },
}

module.exports = resolver_cabinet
