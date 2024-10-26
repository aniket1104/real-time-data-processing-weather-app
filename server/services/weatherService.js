// services/weatherService.js
const axios = require('axios');
const Weather = require('../models/Weather');

const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

const API_KEY = process.env.OPENWEATHER_API_KEY;

const fetchWeatherData = async () => {
    const promises = cities.map(async (city) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
            );

            const weatherCondition = response.data.weather[0].main; // Get the main weather condition
            const { temp, feels_like, humidity, pressure } = response.data.main; // Get temperature details
            const wind_speed = response.data.wind.speed; // Get wind speed
            const weather_description = response.data.weather[0].description; // Get weather description
            const dt = response.data.dt; // Get the Unix timestamp

            const weatherData = {
                city: city,
                main: weatherCondition, // Use the extracted weather condition here
                temp: temp,
                feels_like: feels_like,
                humidity: humidity, // Include humidity
                wind_speed: wind_speed, // Include wind speed
                pressure: pressure, // Include pressure
                weather_description: weather_description, // Include weather description
                dt: dt
            };

            // Save data to MongoDB
            await Weather.create(weatherData);
            console.log(`Weather data for ${city} saved.`);
        } catch (error) {
            console.error(`Failed to fetch weather data for ${city}:`, error.message);
        }
    });

    await Promise.all(promises);
};

const fetchWeatherDataForCity = async (city) => {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        const weatherCondition = response.data.weather[0].main;
        const { temp, feels_like, humidity, pressure } = response.data.main;
        const wind_speed = response.data.wind.speed;
        const weather_description = response.data.weather[0].description;
        const dt = response.data.dt;

        const weatherData = {
            city: city,
            main: weatherCondition,
            temp: temp,
            feels_like: feels_like,
            humidity: humidity,
            wind_speed: wind_speed,
            pressure: pressure,
            weather_description: weather_description,
            dt: dt
        };

        // Save data to MongoDB
        await Weather.create(weatherData);
        console.log(`Weather data for ${city} saved.`);
        return weatherData; // Return the saved data for response
    } catch (error) {
        console.error(`Failed to fetch weather data for ${city}:`, error.message);
        throw error; // Propagate error to be handled in the route
    }
};

module.exports = { fetchWeatherData, fetchWeatherDataForCity };
