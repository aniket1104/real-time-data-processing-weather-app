import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchWeatherSummary } from '../api/weatherApi'; // Assuming a separate API call for detailed data
import '../styles/WeatherDetails.css' // Component-specific styles
import TemperatureChart from '../charts/TemperatureChart';
import { AlertProvider } from '../context/AlertContext';
import Alert from '../components/Alert';

const WeatherDetails = () => {
    const { city } = useParams();
    const [weatherSummary, setWeatherSummary] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getWeatherSummary = async () => {
            try {
                const summaryData = await fetchWeatherSummary(city);
                setWeatherSummary(summaryData);
            } catch (error) {
                setError('Failed to retrieve weather summary');
                console.error(error);
            }
        };

        getWeatherSummary();
    }, [city]);

    return (
        <AlertProvider>
            <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
                <h1 className="text-4xl font-bold mb-8 text-gray-800">Weather Details for {city}</h1>

                {error && <p className="text-red-500 text-lg">{error}</p>}

                {weatherSummary && (
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mb-8">
                        <p className="text-lg font-semibold text-gray-600 mb-2">
                            <span className="font-bold">Average Temperature:</span> {weatherSummary.averageTemperature}°C
                        </p>
                        <p className="text-lg font-semibold text-gray-600 mb-2">
                            <span className="font-bold">Maximum Temperature:</span> {weatherSummary.maximumTemperature}°C
                        </p>
                        <p className="text-lg font-semibold text-gray-600 mb-2">
                            <span className="font-bold">Minimum Temperature:</span> {weatherSummary.minimumTemperature}°C
                        </p>
                        <p className="text-lg font-semibold text-gray-600">
                            <span className="font-bold">Dominant Weather Condition:</span> {weatherSummary.dominantWeatherCondition}
                        </p>
                    </div>
                )}

                <TemperatureChart city={city} />
                <Alert />
            </div>
        </AlertProvider>
    );
};

export default WeatherDetails;