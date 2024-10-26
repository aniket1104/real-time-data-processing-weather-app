import { useState, useEffect } from 'react';
import { fetchWeatherData } from '../api/weatherApi';

const useWeatherData = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getWeatherData = async () => {
            try {
                const data = await fetchWeatherData();
                setWeatherData(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            } finally {
                setLoading(false);
            }
        };

        getWeatherData();
    }, []);

    return { weatherData, loading };
};

export default useWeatherData;
