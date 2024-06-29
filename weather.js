require('dotenv').config()
const axios = require('axios');
API = process.env.API



async function fetchWeather(city) {
    try {
        const baseUrl = "http://api.openweathermap.org/data/2.5/weather";
        const completeUrl = `${baseUrl}?q=${city}&appid=${API}&units=metric`;
        const response = await axios.get(completeUrl);
        if (!response.status_code == 200) {
            throw new Error(`HTTP error! Status: ${response}`);
        }

        const weatherData = await response.data;
        return weatherData;

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

module.exports = fetchWeather;



