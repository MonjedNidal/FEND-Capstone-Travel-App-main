# Travel App

## Project Description
This project is the FEND Capstone Project: Travel App, the final project to graduate from the Front End Web Developer Nanodegree. It allows users to input a location and receive relevant travel information including weather, local images, and geographic data. Also, Users can add and remove trips.

## Features
- **Search**: Enter a city to get geographic data.
- **Weather Information**: Get the current weather and forecast for your destination.
- **Local Images**: View images related to the location.
- **Add/Remove Trips**: Easily add and remove trips for better planning.
- **Select Trip Date**: Choose your desired travel date and see relevant information.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [API Integration](#api-integration)
- [Development](#development)

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/malakbattat/FEND-Capstone-Travel-App-proj.git
    ```
2. Navigate to the project directory:
3. Install dependencies:
    ```sh
    npm install
    ```

## Usage
1. Create a `.env` file in the root of the project and add your API keys:
    ```
    GEONAMES_USERNAME=your_geonames_username
    WEATHERBIT_API_KEY=your_weatherbit_api_key
    PIXABAY_API_KEY=your_pixabay_api_key
    ```
2. Start the development server:
    ```sh
    npm run dev
    ```
3. Open `http://localhost:8080` in your browser and enter a city in the provided form.

## Project Structure
Root
├── package.json
├── readme.md
├── src
│   ├── client
│   │   ├── index.js
│   │   ├── js
│   │   │   └── app.js
│   │   ├── styles
│   │   │   └── style.scss
│   │   └── views
│   │       └── index.html 
│   └── server
│       └── server.js
└── webpack.config.js

## Dependencies
### Production Dependencies
- dotenv
- express
- jest-fetch-mock
- node-fetch
- supertest
- webpack
- webpack-cli

### Development Dependencies
- @babel/core
- @babel/plugin-transform-modules-commonjs
- @babel/preset-env
- babel-jest
- babel-loader
- body-parser
- clean-webpack-plugin
- cors
- css-loader
- html-webpack-plugin
- jest
- sass
- sass-loader
- style-loader
- webpack-dev-server
- workbox-webpack-plugin
- supertest

## API Integration
- **Geonames API**
    - Provides geographical data based on city input.
- **Weatherbit API**
    - Delivers weather information for the destination.
- **Pixabay API**
    - Fetches images related to the location.

## Development
### Scripts
- **Start Development Server**: `npm run dev`
- **Build for Production**: `npm run build`
- **Run Tests**: `npm run test`

### Testing
- Jest and Supertest are used for unit and integration tests.
- Ensure your tests cover both client-side and server-side code.

### Webpack Configuration
- Combined setup for development and production modes with dynamic loading.

## Node.js Version
- Node.js version used: **20.15.0**
