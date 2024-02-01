# Sequelize Express CRUD API
This repository contains a simple CRUD (Create, Read, Update, Delete) API built using Sequelize, Express.js, and MySQL. The API provides endpoints for managing products and users. It includes user authentication using JSON Web Tokens (JWT) and integrates with a MySQL database using Sequelize ORM.

## Features:

- **Product Management:** CRUD operations for products, including creation, retrieval, update, and deletion.
- **User Authentication:** Secure user authentication with JWT.
- **Role-Based Authorization:** Role-based checks to control access, ensuring users can only manage their own products.
- **Database Integration:** Utilizes Sequelize ORM to interact with a MySQL database.



## Technologies Used
- Node.js
- Express
- Sequelize ORM
- MySQL
- JSON Web Tokens (JWT) for authentication

## Project Structure
- /models: Sequelize models for Product and User entities.
- /controllers: Controllers handling the application logic for different routes and managing interactions between the models and the routes.
- /routes: Express.js routes for handling product and user-related requests.
- /middlewares: Custom error handling middleware.
- /config: Database configuration and other configurations.
- /utils: Utility functions, including an API error class.

## Getting Started
1. Clone the repository.
1. Install dependencies using `npm install`.
1. Set up a MySQL database and update the configuration in `config/database.js`.
1. Configure Cloudinary credentials in your environment variables if using Cloudinary.
1. Run the application using `npm start`. The server will run on the specified port.
1. Feel free to customize the code according to your specific needs and requirements.
 
