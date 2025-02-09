# level_2_assignment_3

## Overview

This is for my Advance Web Development Course Assignment. The goal of this assignment is to develop a backend for a blogging platform

## Technologies Used

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![mongoose](https://img.shields.io/badge/Mongoose-592F00?style=for-the-badge&logo=mongoose&logoColor=white) ![vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

## Live website link

Live website link: [Batch-4-assignment-3](https://batch-4-assignment-3.vercel.app/)

## Features

- **Authentication & Authorization**:

  - Users must log in to perform write, update, and delete operations.
  - Admin and User roles is differentiated and secured.

- **User Roles**:

  - Can register and log in.
  - Can create blogs (only when logged in).
  - Can update and delete their own blogs.
  - Cannot perform admin actions.

- **Admin Roles**:

  - Can delete any blog.
  - Can block any user.
  - Cannot update any blog.

- **API Endpoints**:

  - `/api/auth/register`: Register a new user.
  - `/api/auth/login`: Log in a user.
  - `/api/blogs`: create blogs.
  - `/api/blogs/:blogId`: Update a blog by ID.
  - `/api/blogs/:id`: delete a blog by ID.
  - `/api/blogs`: Get all blogs.
  - `/api/admin/users/:userId/block`: Block a user by ID.
  - `/api/admin/blogs/:id`: Delete a blog by ID.

## Errors Handling

- **Error Handling**: The application handles errors gracefully, returning appropriate error responses to the client. proper error messages are sent to the user by the use of global error handeler and custom error handeler.

## Getting Started

Follow these steps to set up the project locally:

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Environment Variables**:

   - Create a `.env` file in the root of the project.
   - Add the following environment variables:
     ```
      PORT=5000
      NODE_ENV=development
      DATABASE_URL=<mongodburl>
      BCRYPT_SALT_ROUNDS=<number>
      JWT_ACCESS_SECRET= <secretkey>
      JWT_REFRESH_SECRET= <secretkey>
     ```

4. **Build the project**:

   ```bash
   npm run build
   ```

5. **Start the server**:

   - For production:
     ```bash
     npm start
     ```
   - For development:
     ```bash
     npm run dev
     ```

6. **Access the application**:
   - Open your browser and go to `http://localhost:5000` to view the application.

## Linting and Formatting

This project uses [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) for linting and formatting.

- **Lint** the code:

  ```bash
  npm run lint
  ```

- **Fix Lint Issues**:

  ```bash
  npm run lint:fix
  ```

- **Format the code**:
  ```bash
  npm run format
  ```
