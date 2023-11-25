
***** Mongoose Express CRUD Mastery

Develop a Node.js Express application with TypeScript as the programming language, integrating MongoDB with Mongoose for user data and order management. Ensure data integrity through validation using Joi/Zod.

*** Set up the Project

1. Create a new Node.js Express project.
2. Set up a MongoDB database using Mongoose for storing user and order data.

*** Define Data Models

Create Mongoose models for User data based on the provided data structure. Refer to the sample-data.json file for ideas.



1. **Create a new user**
    - Endpoint: POST /api/users
                 http://localhost:5000/api/users

2. **Retrieve a list of all users**
    - Endpoint: GET /api/users
                   http://localhost:5000/api/users

3. **Retrieve a specific user by ID**
    - Endpoint: GET /api/users/:userId
                   http://localhost:5000/api/users/(userId)


4. **Update user information**
    - Endpoint: PUT /api/users/:userId
                   http://localhost:5000/api/users/(userId)


5. **Delete a user**
    - Endpoint: DELETE /api/users/:userId
                  http://localhost:5000/api/users/(userId)


***  Order Management


1. **Add New Product in Order**
    - Endpoint: PUT /api/users/:userId/orders
                  http://localhost:5000/api/users/(userId)/orders


2. **Retrieve all orders for a specific user**
    - Endpoint: GET /api/users/:userId/orders
                   http://localhost:5000/api/users/(userId)/orders


3. **Calculate Total Price of Orders for a Specific User**
    - Endpoint: GET /api/users/:userId/orders/total-price
                   http://localhost:5000/api/users/(userId)/orders/total-price
