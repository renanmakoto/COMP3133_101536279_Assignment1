# COMP3133 Assignment 1 - GraphQL Employee Management System

Backend API built with Node.js, Express, Apollo Server, GraphQL, and MongoDB.

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
- If Cloudinary is not configured, `employee_photo` uploads will return an error.

## Run
```bash
npm run dev
# or
npm start
```
Open `http://localhost:4000/graphql` for the Apollo landing page.

## GraphQL Operations
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
    "date_of_joining": "2025-01-10",
    "department": "Engineering",
    "employee_photo": "https://example.com/photo.jpg"
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

## Auth Header (Optional)
If `AUTH_REQUIRED=true`, include an `Authorization` header:
```
Authorization: Bearer <JWT_TOKEN>
```

## Cloudinary Upload
`employee_photo` accepts a public URL or base64 data URI. The API uploads it to Cloudinary and stores the secure URL.

## Notes For Submission
- Remove `node_modules` before creating the ZIP.
- Keep a sample user’s login details for submission screenshots.
