# Real-Time Weather Monitoring System

## Objective
The Real-Time Weather Monitoring System is designed to continuously monitor weather data across Indian metro cities(6) using the OpenWeatherMap API. The system gathers, processes, and analyzes real-time weather data to provide users with daily summarized insights and alerts based on configured thresholds. Users can view daily summaries, historical weather trends for the day, and receive alerts when specified conditions are breached.

## Features
- **Real-time Data Retrieval**: Fetches weather data from OpenWeatherMap API every 5 minutes (configurable).
- **Daily Summarized Insights**: Aggregates weather data to provide daily averages, maximum and minimum temperatures, and the most common weather condition.
- **User-configurable Alerts**: Monitors weather conditions and sends alerts when thresholds are breached (e.g., temperature above 30°C after comparing it with the latest datapoint).
- **Data Visualization**: Displays the temperature trend using Chart.js.

## Technologies Used
- **Backend**: Node.js, Express, MongoDB (for storing weather summaries)
- **Frontend**: React, Chart.js (for visualizations)
- **Weather Data API**: OpenWeatherMap API
- **Additional Packages**: Axios, Chart.js, Context API, Node-cron

## Getting Started

### Prerequisites
- **Node.js** (v12 or later)
- **MongoDB** for data storage
- **OpenWeatherMap API Key** (free API key available at [OpenWeatherMap](https://openweathermap.org/))

## Installation

### Step 1: Clone the Repository

### Step 2: Navigate to the client and server folder and install the dependencies.

### Step 3: Step 4: Configure the Polling Interval (Optional)
In the backend code(server.js), you can configure the interval for weather data retrieval. By default, it is set to fetch data every 5 minutes. Adjust this as needed in the relevant code section.

### Step 4: API Key Setup
For the sake of this project, I have exposed the needed API key(I know that this is not a good practice, but just for the ease I have shared it in the .env).



