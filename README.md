# Tiny Site Frontend Setup Guide

This README provides step-by-step instructions for setting up the Tiny Site Frontend on your local development environment. The Tiny Site Frontend is built using the Next.js framework, Tailwind CSS for styling, TypeScript for enhanced development, and React Query for efficient data fetching. Yarn is used for package management. Before you begin, ensure that you have Yarn installed on your system.

## Setup Instructions

1. Clone the Tiny Site Frontend repository from GitHub:

   ```bash
   git clone https://github.com/Real-Dev-Squad/tiny-site-frontend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd tiny-site-frontend
   ```

3. Install project dependencies using Yarn:

   ```bash
   yarn
   ```

4. Build and run the Tiny Site Frontend:

   ```bash
   yarn dev
   ```

   The frontend development server should now be running at `http://localhost:3000`.

5. Access the Tiny Site Frontend in your web browser at `http://localhost:3000` and start developing your application.

## Tech Stack

The Tiny Site Frontend uses the following technologies:

- **Next.js**: A React framework for building server-rendered and statically generated web applications.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **TypeScript**: A superset of JavaScript that adds static types to the language.
- **React Query**: A library for managing, caching, and synchronizing data in React applications.

## Usage

You can explore and modify the Tiny Site Frontend codebase to build your application. Refer to the project's documentation and the Next.js, Tailwind CSS, TypeScript, and React Query documentation for more information on how to work with these technologies.

## Connecting to the Tiny Site Backend

To connect the Tiny Site Frontend to the backend, follow the backend setup instructions in the [Tiny Site Backend README](https://github.com/Real-Dev-Squad/tiny-site-backend/blob/develop/README.md). Once the backend is set up locally, update the frontend configuration to point to your local backend server.
