// routes/weatherRoutes.js
const express = require('express');
const router = express.Router();
const { getLast24HoursData } = require('../controllers/weatherController');
const Weather = require('../models/Weather');
const { fetchWeatherDataForCity } = require('../services/weatherService');

router.get('/:city', getLast24HoursData);


// Get temperature data for a specific city
router.get('/temperature/:city', async (req, res) => {
    const city = req.params.city;

    try {
        const data = await Weather.find(
            { city: new RegExp(`^${city}$`, 'i') }
        ).select('temp feels_like createdAt') // Only fetch temperature-specific fields
            .sort({ dt: 1 })
            .limit(24);

        if (!data || data.length === 0) {
            return res.status(404).send('No data found for this city');
        }

        res.json(data);
    } catch (error) {
        console.error(`Error fetching temperature data for ${city}:`, error.message);
        res.status(500).send('Failed to retrieve temperature data');
    }
});

router.post('/add-city', async (req, res) => {
    const { city } = req.body;

    if (!city) {
        return res.status(400).send('City name is required');
    }

    try {
        const weatherData = await fetchWeatherDataForCity(city);
        res.json(weatherData);
    } catch (error) {
        console.error(`Failed to fetch weather data for ${city}:`, error.message);
        res.status(500).send('Failed to fetch weather data');
    }
});

router.get('/summary/:city', async (req, res) => {
    const city = req.params.city;

    try {
        // Fetch last 24 records for the city
        const data = await Weather.find({
            city: new RegExp(`^${city}$`, 'i')
        }).sort({ dt: 1 }).limit(24);

        if (!data || data.length === 0) {
            return res.status(404).send('No data found for this city');
        }

        // Calculate average, max, and min temperature
        const temperatures = data.map(record => record.temp);
        const averageTemp = temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;
        const maxTemp = Math.max(...temperatures);
        const minTemp = Math.min(...temperatures);

        // Determine the dominant weather condition
        const weatherConditions = data.map(record => record.main);
        const dominantWeather = weatherConditions.sort((a, b) =>
            weatherConditions.filter(v => v === a).length - weatherConditions.filter(v => v === b).length
        ).pop();

        res.json({
            averageTemperature: averageTemp.toFixed(2), // Format to 2 decimal places
            maximumTemperature: maxTemp,
            minimumTemperature: minTemp,
            dominantWeatherCondition: dominantWeather
        });
    } catch (error) {
        console.error(`Error fetching weather summary for ${city}:`, error.message);
        res.status(500).send('Failed to retrieve weather summary data');
    }
});


module.exports = router;