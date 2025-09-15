# Teknolab Backend

## Overview
Teknolab_Backend is a backend application built with TypeScript and Express, designed to manage user-related operations using a persistent database. The application utilizes Prisma as an ORM to interact with the database hosted on Render.com.

## Features
- User management (create, read, update, delete)
- Persistent database integration
- RESTful API design

## Technologies Used
- TypeScript
- Express.js
- Prisma
- Render.com (for database hosting)

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)
- A Render.com account for database hosting

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd Teknolab_Backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and add your database connection string and other necessary configurations.

### Database Setup
- Define your database schema in `prisma/schema.prisma`.
- Run the following command to generate the Prisma client:
  ```
  npx prisma generate
  ```

### Running the Application
- Start the server:
  ```
  npm start
  ```

### API Endpoints
- `POST /users`: Create a new user
- `GET /users/:id`: Retrieve a user by ID
- `PUT /users/:id`: Update a user by ID
- `DELETE /users/:id`: Delete a user by ID

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.