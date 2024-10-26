// models/Weather.js
const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    city: { type: String, required: true },
    main: { type: String, required: true },
    temp: { type: Number, required: true },
    feels_like: { type: Number, required: true },
    dt: { type: Number, required: true },
    humidity: { type: Number },
    wind_speed: { type: Number },
    pressure: { type: Number },
    weather_description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Weather', weatherSchema);
