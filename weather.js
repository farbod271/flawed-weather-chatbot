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
        // console.log(weatherData);
        return weatherData;

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

fetchWeather("Berlin");



