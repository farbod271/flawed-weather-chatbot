require('dotenv').config()
const axios = require('axios');

// Import necessary modules
API = process.env.API



// const lat = '48.8333535';
// const lon = '12.96205';
const city = 'London'
// Base URL for Weather API
const baseUrl = "http://api.openweathermap.org/data/2.5/weather";

// Construct the complete URL
// const completeUrl = `${baseUrl}?lat=${lat}&lon=${lon}&appid=${API}&units=metric`;
const completeUrl = `${baseUrl}?q=${city}&appid=${API}&units=metric`;

// Function to fetch weather data
async function fetchWeather() {
    try {
        const response = await axios.get(completeUrl);
        if (!response.status_code == 200) {
            throw new Error(`HTTP error! Status: ${response}`);
        }

        const weatherData = await response;
        console.log(weatherData.data);
        return weatherData.data;

        // Extract necessary data
        // const temperature = (weatherData.main.temp);
        // const tempMin = (weatherData.main.temp_min);
        // const tempMax = (weatherData.main.temp_max);
        // const weatherDescription = weatherData.weather[0].description;
        // const icon = weatherData.weather[0].icon;
        // const windSpeed = (weatherData.wind.speed * 3.6);
        // const humidity = weatherData.main.humidity;

        // // Create context object
        // const context = {
        //     temperature,
        //     weatherDescription,
        //     tempMin,
        //     tempMax,
        //     icon,
        //     date,
        //     windSpeed,
        //     humidity
        // };

        // console.log("Weather Data:", weatherData);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

//export
module.exports = fetchWeather;



