# Tiny Site Frontend Setup Guide

## Project Overview

The Tiny Site Frontend is a web application built using the Next.js framework, Tailwind CSS for styling, TypeScript for enhanced development, and React Query for efficient data fetching. This guide provides step-by-step instructions for setting up the Tiny Site Frontend on your local development environment.

### Tech Stack

The Tiny Site Frontend uses the following technologies:

- **Next.js(13.4.19)**: A React framework for building server-rendered and statically generated web applications.
- **Tailwind CSS(3.3.3)**: A utility-first CSS framework for rapid UI development.
- **TypeScript(5.2.2)**: A superset of JavaScript that adds static types to the language.
- **React Query(3.39.3)**: A library for managing, caching, and synchronizing data in React applications.
- **Node.js (18.14.0)**: A JavaScript runtime environment that executes JavaScript code outside of a browser.
- **Volta(Latest)**: A JavaScript tool manager that allows you to easily switch between different versions of Node.js and Yarn.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setup Instructions](#setup-instructions)
3. [Usage](#usage)
4. [Connecting to the Tiny Site Backend](#connecting-to-the-tiny-site-backend)
5. [Project Structure](#project-structure)

## Prerequisites

Before you begin, ensure that you have the following installed on your system:
- [Volta](https://docs.volta.sh/guide/getting-started): Volta is used for Node.js and Yarn version management.
- [Yarn](https://yarnpkg.com/getting-started/install): Yarn is used for package management.

## Setup Instructions

1. **Clone the Tiny Site Frontend repository from GitHub:**

   ```bash
   git clone https://github.com/Real-Dev-Squad/tiny-site-frontend.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd tiny-site-frontend
   ```

3. **Install project dependencies using Yarn:**

   ```bash
   yarn
   ```

4. **Build and run the Tiny Site Frontend:**

   ```bash
   yarn dev
   ```

   The frontend development server should now be running at `http://localhost:3000`.

5. **Access the Tiny Site Frontend in your web browser at `http://localhost:3000` and start developing your application.**

## Usage

You can explore and modify the Tiny Site Frontend codebase to build your application. Refer to the project's documentation and the Next.js, Tailwind CSS, TypeScript, and React Query documentation for more information on how to work with these technologies.

## Connecting to the Tiny Site Backend

To connect the Tiny Site Frontend to the backend, follow the backend setup instructions in the [Tiny Site Backend README](https://github.com/Real-Dev-Squad/tiny-site-backend/blob/develop/README.md). Once the backend is set up locally, update the frontend configuration to point to your local backend server.

## Project Structure

The project is organized as follows:

- **`__mocks__`**: Contains mock files for Jest tests.
- **`__tests__`**: Contains Jest tests for the project.
- **`.github`**: Contains GitHub Actions workflows for the project.
- **`.husky`**: Contains Husky configuration files for the project.
- **`Doc`**: Contains documentation for the project.
- **`public`**: Contains static assets for the project.
- **`src`**: Contains the source code for the project.

   - **`components`**: Contains React components for the project.
   - **`constants`**: Contains constants for the project.
   - **`hooks`**: Contains React hooks for the project.
   - **`pages`**: Contains Next.js pages for the project.
   - **`services`**: Contains services for the project.
   - **`styles`**: Contains Tailwind CSS styles for the project.
   - **`types`**: Contains TypeScript types for the project.
   - **`utils`**: Contains utility functions for the project.

## Useful Links

- [Real Dev Squad Code Conventions](https://github.com/Real-Dev-Squad/docs/tree/main/docs/conventions)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [React Query Documentation](https://tanstack.com/query/v3/docs/react/overview)
- [Node.js Documentation](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)
- [Volta Documentation](https://docs.volta.sh)
- [Yarn Documentation](https://yarnpkg.com/getting-started)
- [Go Documentation](https://golang.org/doc)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
