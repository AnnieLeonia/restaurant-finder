# 🍴 Restaurant Finder

## 📑 Table of Contents

* [🍴 Restaurant Finder](#-restaurant-finder)
  * [📑 Table of Contents](#-table-of-contents)
  * [🏃 Running the Project](#-running-the-project)
  * [☁️ Server](#-server)
  * [💻 Client](#-client)
  * [📱 App](#-app)
  * [🔧 Configuration Files](#-configuration-files)
  * [📝 Notes](#-notes)

## 🏃 Running the Project

To run the project, follow these steps:

1. Install the dependencies by running `npm install`.
2. Start the project with `npm run dev`.
3. Access the client at http://localhost:8081.
3. Access the server at http://localhost:3000.

## ☁️ Server

The server handles the back-end functionalities, including the database and REST API routes. The server code is located in the `src/server` directory.

## 💻 Client

The client handles the front-end functionalities and is responsible for the React app. The client code is located in the `src/client` directory.

## 📱 App

The app use [`expo-router`](https://expo.github.io/router) to build native navigation using files in the `src/app` directory, importing code from `src/client`.

## 🔧 Configuration Files

- `README.md`: This file, provides an overview of the project.
- `tsconfig.json`: TypeScript configuration for the client code.
- `src/server/tsconfig.json`: TypeScript configuration for the server code.
- `webpack.config.js`: Configuration file for the build process using Webpack (currently only the server code).

## 📝 Notes

- [Expo Router: Docs](https://expo.github.io/router)
- [Expo Router: Repo](https://github.com/expo/router)
