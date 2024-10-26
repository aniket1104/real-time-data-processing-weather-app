import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherCardGrid from '../components/WeatherCard';

const Dashboard = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [alerts, setAlerts] = useState([]); // Changed to an array to hold multiple alerts
    const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
    const apiKey = '9249c8c70184d61df01ae06d3bda45a6'; // Replace with your OpenWeatherMap API key
    const threshold = 30; // Temperature threshold for alert

    useEffect(() => {
        const fetchWeatherDataForCities = async () => {
            try {
                const data = await Promise.all(
                    cities.map(async (city) => {
                        const response = await axios.get(
                            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
                        );
                        return {
                            city: city,
                            main: response.data.weather[0].main,
                            description: response.data.weather[0].description,
                            temp: response.data.main.temp,
                            feels_like: response.data.main.feels_like,
                            humidity: response.data.main.humidity,
                            wind_speed: response.data.wind.speed,
                            timestamp: new Date(response.data.dt * 1000)
                        };
                    })
                );

                // Check for all cities above the threshold
                const highTempCities = data.filter(cityData => cityData.temp > threshold);

                // Generate alert messages for each city exceeding the threshold
                if (highTempCities.length > 0) {
                    setAlerts(
                        highTempCities.map(
                            cityData => `Alert: ${cityData.city} temperature is above ${threshold}°C (${cityData.temp}°C)!`
                        )
                    );
                } else {
                    setAlerts([]); // Reset alerts if no city exceeds the threshold
                }

                setWeatherData(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherDataForCities();
    }, []);

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-6">Weather Dashboard</h1>

            {/* Display each alert in its own alert box */}
            {alerts.length > 0 && (
                <div className="mb-4">
                    {alerts.map((alert, index) => (
                        <div key={index} className="bg-yellow-500 text-white p-4 rounded mb-2 text-center">
                            {alert}
                        </div>
                    ))}
                </div>
            )}

            <WeatherCardGrid weatherData={weatherData} />
        </div>
    );
};

export default Dashboard;
