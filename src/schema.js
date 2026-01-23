const cosmic_schema_scroll = `#graphql
  scalar Date

  type User {
    id: ID!
    username: String!
    email: String!
    created_at: Date
    updated_at: Date
  }

  type Employee {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    designation: String!
    salary: Float!
    date_of_joining: Date!
    department: String!
    employee_photo: String
    created_at: Date
    updated_at: Date
  }

  type UserResponse {
    success: Boolean!
    message: String!
    user: User
  }

  type AuthResponse {
    success: Boolean!
    message: String!
    token: String
    user: User
  }

  type EmployeeResponse {
    success: Boolean!
    message: String!
    employee: Employee
  }

  type EmployeeListResponse {
    success: Boolean!
    message: String!
    employees: [Employee!]!
  }

  type DeleteResponse {
    success: Boolean!
    message: String!
  }

  input EmployeeInput {
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    designation: String!
    salary: Float!
    date_of_joining: Date!
    department: String!
    employee_photo: String
  }

  input EmployeeUpdateInput {
    first_name: String
    last_name: String
    email: String
    gender: String
    designation: String
    salary: Float
    date_of_joining: Date
    department: String
    employee_photo: String
  }

  type Query {
    getAllEmployees: EmployeeListResponse!
    getEmployeeById(eid: ID!): EmployeeResponse!
    searchEmployees(designation: String, department: String): EmployeeListResponse!
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): UserResponse!
    login(usernameOrEmail: String!, password: String!): AuthResponse!
    addEmployee(input: EmployeeInput!): EmployeeResponse!
    updateEmployeeById(eid: ID!, input: EmployeeUpdateInput!): EmployeeResponse!
    deleteEmployeeById(eid: ID!): DeleteResponse!
  }
`

module.exports = cosmic_schema_scroll
