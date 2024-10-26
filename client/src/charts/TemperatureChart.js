
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchWeatherDataByCity } from '../api/weatherApi';
import { useAlert } from '../context/AlertContext'; // Import alert context
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register required components with Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TemperatureChart = ({ city }) => {
    const [temperatureData, setTemperatureData] = useState([]);
    const [timeData, setTimeData] = useState([]);
    const { setAlert } = useAlert(); // Get setAlert from context
    const threshold = 30;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchWeatherDataByCity(city);
                const temps = data.map(record => record.temp);
                const times = data.map(record => new Date(record.createdAt).toLocaleTimeString());

                setTemperatureData(temps);
                setTimeData(times);

                // Check if the latest temperature breaches threshold
                const latestTemp = temps[temps.length - 1];
                if (latestTemp > threshold) {
                    setAlert({
                        message: `Alert: ${city} temperature is above ${threshold}°C (${latestTemp}°C)!`,
                        type: 'warning',
                    });
                }
            } catch (error) {
                console.error("Failed to fetch temperature data:", error);
            }
        };

        const interval = setInterval(fetchData, 60 * 1000); // Poll every minute
        fetchData(); // Initial fetch

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [city, setAlert]);

    const chartData = {
        labels: timeData,
        datasets: [
            {
                label: `Temperature in ${city}`,
                data: temperatureData,
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: {
                display: true,
                text: `Temperature Data for ${city}`,
            },
        },
    };

    return (
        <div className="w-full p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Temperature Chart for {city}</h2>
            <div className="w-full">
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default TemperatureChart;
