const {
  body: velvet_body,
  validationResult: cranky_validation_result,
} = require('express-validator')

const wacky_validation_rules = {
  Signup: [
    velvet_body('variables.username')
      .isString()
      .isLength({ min: 3 })
      .withMessage('Username must be at least 3 characters.'),
    velvet_body('variables.email').isEmail().withMessage('Email must be valid.'),
    velvet_body('variables.password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters.'),
  ],
  Login: [
    velvet_body('variables.usernameOrEmail')
      .notEmpty()
      .withMessage('Username or email is required.'),
    velvet_body('variables.password').notEmpty().withMessage('Password is required.'),
  ],
  AddEmployee: [
    velvet_body('variables.input.first_name').notEmpty().withMessage('First name is required.'),
    velvet_body('variables.input.last_name').notEmpty().withMessage('Last name is required.'),
    velvet_body('variables.input.email').isEmail().withMessage('Email must be valid.'),
    velvet_body('variables.input.gender')
      .isIn(['Male', 'Female', 'Other'])
      .withMessage('Gender must be Male, Female, or Other.'),
    velvet_body('variables.input.designation')
      .notEmpty()
      .withMessage('Designation is required.'),
    velvet_body('variables.input.salary')
      .isFloat({ min: 1000 })
      .withMessage('Salary must be at least 1000.'),
    velvet_body('variables.input.date_of_joining')
      .notEmpty()
      .withMessage('Date of joining is required.'),
    velvet_body('variables.input.department')
      .notEmpty()
      .withMessage('Department is required.'),
  ],
  UpdateEmployeeById: [
    velvet_body('variables.eid').notEmpty().withMessage('Employee ID is required.'),
  ],
  DeleteEmployeeById: [
    velvet_body('variables.eid').notEmpty().withMessage('Employee ID is required.'),
  ],
  GetEmployeeById: [
    velvet_body('variables.eid').notEmpty().withMessage('Employee ID is required.'),
  ],
  SearchEmployees: [
    velvet_body('variables.designation')
      .optional()
      .isString()
      .withMessage('Designation must be a string.'),
    velvet_body('variables.department')
      .optional()
      .isString()
      .withMessage('Department must be a string.'),
  ],
}

const sniff_operation_name = (request_blob) => {
  if (request_blob.body && request_blob.body.operationName) {
    return request_blob.body.operationName
  }
  const query_blob = request_blob.body && request_blob.body.query
  if (typeof query_blob !== 'string') return null
  const match_blob = query_blob.match(/\b(?:mutation|query)\s+([A-Za-z0-9_]+)/)
  return match_blob ? match_blob[1] : null
}

const graphql_validation_muffin = async (request_blob, response_blob, next_blob) => {
  const operation_name = sniff_operation_name(request_blob)
  const rule_pack = wacky_validation_rules[operation_name]
  if (!rule_pack) {
    return next_blob()
  }
  await Promise.all(rule_pack.map((rule_item) => rule_item.run(request_blob)))
  const validation_result = cranky_validation_result(request_blob)
  if (!validation_result.isEmpty()) {
    return response_blob.status(400).json({
      errors: validation_result.array().map((error_blob) => ({
        field: error_blob.path,
        message: error_blob.msg,
      })),
    })
  }
  return next_blob()
}

module.exports = graphql_validation_muffin
