import React from 'react';

const WeatherCard = ({ weather }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 m-4 w-72">
            <a href={`/weather/${weather.city}`}>
                <h2 className="text-2xl font-bold mb-2">{weather.city}</h2>
                <p className="text-lg text-gray-600 capitalize">{weather.main}</p>
                <p className="text-sm text-gray-500">{weather.description}</p>
                <p className="text-4xl font-semibold mb-2">{weather.temp}°C</p>
                <p className="text-gray-500">Feels like: {weather.feels_like}°C</p>
                <p className="text-gray-500">Humidity: {weather.humidity}%</p>
                <p className="text-gray-500">Wind Speed: {weather.wind_speed} m/s</p>
                <p className="text-sm text-gray-400">
                    {weather.timestamp.toLocaleString()}
                </p>
            </a>
        </div>
    );
};

const WeatherCardGrid = ({ weatherData }) => {
    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {weatherData.map((weather, index) => (
                    <WeatherCard key={index} weather={weather} />
                ))}
            </div>
        </div>
    );
};

export default WeatherCardGrid;
