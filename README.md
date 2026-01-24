# COMP3133 Assignment 1 - GraphQL Employee Management System

Backend API built with Node.js, Express, Apollo Server, GraphQL, and MongoDB.

## Deployed API (Vercel)
Base URL:
- https://comp-3133-101536279-assignment1.vercel.app

## Endpoints and Methods
Production (Vercel):
- POST https://comp-3133-101536279-assignment1.vercel.app/api/graphql
- POST https://comp-3133-101536279-assignment1.vercel.app/graphql (rewrite to /api/graphql)
- GET https://comp-3133-101536279-assignment1.vercel.app/ (status check)

Local:
- POST http://localhost:4000/graphql
- GET http://localhost:4000/ (status check)

All GraphQL operations use POST with JSON body.

## Requirements
- Node.js 18+ (tested with Node 24)
- MongoDB running locally or a connection string (Atlas also works)
- Optional: Cloudinary credentials for employee photo uploads

## Setup
```bash
npm install
cp .env.example .env
```
Update `.env` with your MongoDB and Cloudinary credentials.

## Environment Variables
```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/comp3133__StudentID_assigment1
JWT_SECRET=change_me
AUTH_REQUIRED=false
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

- `AUTH_REQUIRED=true` enforces JWT auth on employee queries/mutations.
- If Cloudinary is not configured, omit `employee_photo` or set it to `null`.
- `date_of_joining` must be ISO 8601 with time zone, e.g. `2025-01-10T00:00:00.000Z`.

## Run
```bash
npm run dev
# or
npm start
```

## Request Format (Postman)
Headers:
- Content-Type: application/json
- Authorization: Bearer <JWT_TOKEN> (only if AUTH_REQUIRED=true)

Body shape:
```json
{
  "operationName": "Signup",
  "query": "mutation Signup($username: String!, $email: String!, $password: String!) { signup(username: $username, email: $email, password: $password) { success message user { id username email created_at } } }",
  "variables": {
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "Password123"
  }
}
```

## GraphQL Operations (Assignment Requirements)
Note: To trigger `express-validator` rules, use the same **operation names** shown below.

### 1) Signup
```graphql
mutation Signup($username: String!, $email: String!, $password: String!) {
  signup(username: $username, email: $email, password: $password) {
    success
    message
    user {
      id
      username
      email
      created_at
    }
  }
}
```
Variables:
```json
{
  "username": "testuser",
  "email": "testuser@example.com",
  "password": "Password123"
}
```

### 2) Login
```graphql
mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    success
    message
    token
    user {
      id
      username
      email
    }
  }
}
```
Variables:
```json
{
  "usernameOrEmail": "testuser",
  "password": "Password123"
}
```

### 3) Get All Employees
```graphql
query GetAllEmployees {
  getAllEmployees {
    success
    message
    employees {
      id
      first_name
      last_name
      email
      designation
      department
      salary
      gender
      date_of_joining
      employee_photo
    }
  }
}
```

### 4) Add Employee
```graphql
mutation AddEmployee($input: EmployeeInput!) {
  addEmployee(input: $input) {
    success
    message
    employee {
      id
      first_name
      last_name
      email
      designation
      department
      salary
      gender
      date_of_joining
      employee_photo
    }
  }
}
```
Variables:
```json
{
  "input": {
    "first_name": "Alex",
    "last_name": "Chen",
    "email": "alex.chen@example.com",
    "gender": "Male",
    "designation": "Developer",
    "salary": 5200,
    "date_of_joining": "2025-01-10T00:00:00.000Z",
    "department": "Engineering",
    "employee_photo": null
  }
}
```

### 5) Get Employee By ID
```graphql
query GetEmployeeById($eid: ID!) {
  getEmployeeById(eid: $eid) {
    success
    message
    employee {
      id
      first_name
      last_name
      email
      designation
      department
    }
  }
}
```
Variables:
```json
{
  "eid": "PUT_EMPLOYEE_ID_HERE"
}
```

### 6) Update Employee By ID
```graphql
mutation UpdateEmployeeById($eid: ID!, $input: EmployeeUpdateInput!) {
  updateEmployeeById(eid: $eid, input: $input) {
    success
    message
    employee {
      id
      first_name
      last_name
      email
      designation
      department
      salary
      gender
      date_of_joining
      employee_photo
    }
  }
}
```
Variables:
```json
{
  "eid": "PUT_EMPLOYEE_ID_HERE",
  "input": {
    "designation": "Senior Developer",
    "salary": 7500
  }
}
```

### 7) Delete Employee By ID
```graphql
mutation DeleteEmployeeById($eid: ID!) {
  deleteEmployeeById(eid: $eid) {
    success
    message
  }
}
```
Variables:
```json
{
  "eid": "PUT_EMPLOYEE_ID_HERE"
}
```

### 8) Search Employees By Designation or Department
```graphql
query SearchEmployees($designation: String, $department: String) {
  searchEmployees(designation: $designation, department: $department) {
    success
    message
    employees {
      id
      first_name
      last_name
      email
      designation
      department
    }
  }
}
```
Variables:
```json
{
  "designation": "Developer"
}
```

## Notes For Submission
- Export the Postman collection (JSON).
- Include screenshots for each API request/response and MongoDB collections.
- Remove `node_modules` before creating the ZIP.
- Provide the GitHub repo link, deployed URL, and sample user credentials.
