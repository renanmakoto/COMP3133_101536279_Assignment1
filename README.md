# COMP3133 Assignment 1 - GraphQL Employee Management System

<h2 align="center">Technologies Used</h2>
<p align="center">
  <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/960px-Unofficial_JavaScript_logo_2.svg.png" style="width: 64px; height: 64px;"/></a>
  <a href="https://nodejs.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" style="width: 64px; height: 64px;" /></a>
  <a href="https://expressjs.com/"><img src="https://raw.githubusercontent.com/devicons/devicon/ca28c779441053191ff11710fe24a9e6c23690d6/icons/express/express-original-wordmark.svg" style="width: 50px; height: 70px;" /></a>
  <a href="https://www.mongodb.com/brand-resources"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/2560px-MongoDB_Logo.svg.png" style="width: 204px; height: 64px;" /></a>
</p>

Live URLs and credentials

Backend base URL: https://comp-3133-101536279-assignment1.vercel.app/

API base path for testing: https://comp-3133-101536279-assignment1.vercel.app/api/graphql

Sample user credentials for testing:

Email: renan@example.com
Username: renan
Password: Password123

Live API endpoints (all are POST with Content-Type: application/json)

- GraphQL endpoint (all operations): https://comp-3133-101536279-assignment1.vercel.app/api/graphql
- GraphQL endpoint (rewrite): https://comp-3133-101536279-assignment1.vercel.app/graphql

Operations (operationName values)
- Signup (operationName: Signup)
- Login (operationName: Login)
- Get all employees (operationName: GetAllEmployees)
- Search employees (operationName: SearchEmployees)
- Create a new employee (operationName: AddEmployee)
- Get employee by ID (operationName: GetEmployeeById)
- Update employee by ID (operationName: UpdateEmployeeById)
- Delete employee by ID (operationName: DeleteEmployeeById)



Proof of Cloudinary usage
- Postman upload and API response showing Cloudinary URL stored for `employee_photo`:

  ![Postman Cloudinary upload](Cloudinary_postman.png)

- Mongo shell showing Cloudinary URL persisted in the `employees` collection:

  ![Mongo shell with Cloudinary URL](Cloudinary_Mongoshell.png)
