import React from 'react';
import { Line } from 'react-chartjs-2';

const WeatherChart = ({ weatherData }) => {
    const data = {
        labels: weatherData.map(data => new Date(data.date).toLocaleDateString()),
        datasets: [
            {
                label: 'Average Temperature (°C)',
                data: weatherData.map(data => data.avgTemp),
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
                fill: false,
            },
            {
                label: 'Max Temperature (°C)',
                data: weatherData.map(data => data.maxTemp),
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 2,
                fill: false,
            },
            {
                label: 'Min Temperature (°C)',
                data: weatherData.map(data => data.minTemp),
                borderColor: 'rgba(54,162,235,1)',
                borderWidth: 2,
                fill: false,
            },
        ],
    };

    return (
        <div>
            <h2>Weather Summary</h2>
            <Line data={data} />
        </div>
    );
};

export default WeatherChart;
