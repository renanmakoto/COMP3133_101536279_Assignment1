# COMP3133 Assignment 1 - GraphQL Employee Management System

<h2 align="center">Technologies Used</h2>
<p align="center">
  <a href="https://www.javascript.com/" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript" width="64" height="64"></a>
  <a href="https://nodejs.org/" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="Node.js" width="64" height="64"></a>
  <a href="https://expressjs.com/" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" alt="Express" width="64" height="64"></a>
  <a href="https://graphql.org/" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg" alt="GraphQL" width="64" height="64"></a>
  <a href="https://www.mongodb.com/" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" alt="MongoDB" width="64" height="64"></a>
  <a href="https://vercel.com/" target="_blank"><img src="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png" alt="Vercel" width="64" height="64"></a>
</p>

Stack
Backend: Node.js, Express, Apollo Server (GraphQL), Mongoose, bcryptjs, jsonwebtoken, express-validator, validator, cloudinary, cors, dotenv
Database: MongoDB Atlas
Frontend: None (API-only; tested with Postman)
Deployment: Vercel serverless API

Live URLs and credentials
Frontend login: N/A
Backend base URL: https://comp-3133-101536279-assignment1.vercel.app/
API base path for testing: https://comp-3133-101536279-assignment1.vercel.app/api/graphql

Sample user credentials for testing:
Email: renan@example.com
Username: renan
Password: Password123

Live API endpoints
POST — GraphQL endpoint (all operations) https://comp-3133-101536279-assignment1.vercel.app/api/graphql
POST — GraphQL endpoint (rewrite) https://comp-3133-101536279-assignment1.vercel.app/graphql

POST — Signup (operationName: Signup)
POST — Login (operationName: Login)
POST — Get all employees (operationName: GetAllEmployees)
POST — Search employees (operationName: SearchEmployees)
POST — Create a new employee (operationName: AddEmployee)
POST — Get employee by ID (operationName: GetEmployeeById)
POST — Update employee by ID (operationName: UpdateEmployeeById)
POST — Delete employee by ID (operationName: DeleteEmployeeById)

LOCAL TESTING INSTRUCTIONS

Running locally with Node.js
Backend:

npm install
npm run dev (starts http://localhost:4000)

GraphQL endpoint:
http://localhost:4000/graphql

Notes
- Use POST with Content-Type: application/json for all GraphQL operations.
- date_of_joining must be ISO 8601, example: 2025-01-10T00:00:00.000Z
- If Cloudinary is not configured, omit employee_photo or set it to null.
