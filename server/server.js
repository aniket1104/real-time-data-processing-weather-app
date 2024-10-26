const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors'); // Import cors
const weatherRoutes = require('./routes/weatherRoutes');
const errorHandler = require('./middlewares/errorHandler');
const cron = require('node-cron');
const { fetchWeatherData } = require('./services/weatherService');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Use cors middleware

// Middleware for JSON parsing
app.use(express.json());

// Database connection
connectDB();

// API Routes
app.use('/api/weather', weatherRoutes);

// Schedule job to run every hour
cron.schedule('*/5 * * * *', async () => {
    console.log('Fetching weather data every 5 minutes...');
    await fetchWeatherData();
});

// cron.schedule('* * * * *', async () => {
//     console.log('Fetching weather data every 1 minutes...');
//     await fetchWeatherData();
// });


// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
