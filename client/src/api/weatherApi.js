import axios from 'axios';

// Fetch weather data from the backend
export const fetchWeatherData = async (city) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/weather/${city}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};

export const fetchWeatherDataByCity = async (city) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/weather/temperature/${city}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching weather details for city:', error);
        throw error;
    }
};

export const fetchWeatherSummary = async (city) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/weather/summary/${city}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch weather summary for ${city}:`, error.message);
        throw error;
    }
};
