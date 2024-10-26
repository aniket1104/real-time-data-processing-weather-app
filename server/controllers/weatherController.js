// controllers/weatherController.js
const Weather = require('../models/Weather');

const getLast24HoursData = async (req, res) => {
    const city = req.params.city;

    try {
        const twentyFourHoursAgo = Math.floor(Date.now() / 1000) - (24 * 60 * 60); // Current time in seconds minus 24 hours

        const data = await Weather.find({
            city: new RegExp(`^${city}$`, 'i'),
            dt: { $gte: twentyFourHoursAgo } // Compare with Unix timestamp
        }).sort({ dt: 1 });

        if (!data || data.length === 0) {
            return res.status(404).send('No data found for this city in the last 24 hours');
        }

        res.json(data);
    } catch (error) {
        console.error(`Error fetching last 24 hours data for ${city}:`, error.message);
        res.status(500).send('Failed to retrieve last 24 hours data');
    }
};

module.exports = { getLast24HoursData };
