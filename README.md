# :fork_and_knife: Restaurant Finder

## :bookmark_tabs: Table of Contents

- [:fork_and_knife: Restaurant Finder](#fork-and-knife-restaurant-finder)
  - [:bookmark_tabs: Table of Contents](#bookmark-tabs-table-of-contents)
  - [:running: Running the Project](#running-running-the-project)
  - [:cloud: Server](#cloud-server)
  - [:computer: Client](#computer-client)
  - [:iphone: App](#iphone-app)
  - [:wrench: Configuration Files](#wrench-configuration-files)
  - [:memo: Notes](#memo-notes)

## :running: Running the Project

To run the project, follow these steps:

1. Install the dependencies by running `npm install`.
2. Start the project with `npm run dev`.
3. Access the server at http://localhost:3000.

## :cloud: Server

The server handles the back-end functionalities, including the database and REST API routes. The server code is located in the `src/server` directory.

## :computer: Client

The client handles the front-end functionalities and is responsible for the React app. The client code is located in the `src/client` directory.

## :iphone: App

The app use [`expo-router`](https://expo.github.io/router) to build native navigation using files in the `src/app` directory, importing code from `src/client`.

## :wrench: Configuration Files

- `README.md`: This file, provides an overview of the project.
- `tsconfig.json`: TypeScript configuration for the client code.
- `src/server/tsconfig.json`: TypeScript configuration for the server code.
- `webpack.config.js`: Configuration file for the build process using Webpack (currently only the server code).

## :memo: Notes

- [Expo Router: Docs](https://expo.github.io/router)
- [Expo Router: Repo](https://github.com/expo/router)
