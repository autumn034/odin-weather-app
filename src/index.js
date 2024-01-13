import css from "./style.css";
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const cityNameText = document.getElementById("cityNameText");
const weatherTypeText = document.getElementById("weatherTypeText");
const temperatureText = document.getElementById("temperatureText");
const feelsLikeText = document.getElementById("feelsLikeText");
const windText = document.getElementById("windText");
const humidityText = document.getElementById("humidityText");

searchButton.addEventListener("click", e => {
    e.preventDefault();
    const cityNameInput = searchInput.value;
    updateWeatherDisplay(cityNameInput);
});

async function updateWeatherDisplay(cityName) {
    const weatherData = await getWeatherData(cityName);
    console.log(weatherData);
    cityNameText.innerText = weatherData["name"]    
    weatherTypeText.innerText = weatherData["weather"][0]["main"];
    temperatureText.innerText = weatherData["main"]["temp"];
    // feelsLikeText.innerText = `${weatherData["main"]["feels_like"]}c`;
    // windText.innerText = `${weatherData["wind"]["speed"]} MPH`;
    // humidityText.innerText = `${weatherData["main"]["humidity"]}%`;
}

async function getWeatherData(cityName) {
    try {
        const APIKey = "3cca2df03456fd625a7bbe7f00a970d4";

        // get coordinates from city name
        let geocode = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${APIKey}`, {mode: "cors"});
        geocode = await geocode.json();
        let lat = geocode[0]["lat"];
        let lon = geocode[0]["lon"];    

        // get weather data from coordinates
        let weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIKey}`, {mode: "cors"});
        weatherData = await weatherData.json();       
        return weatherData;

    } catch (error) {
        console.log(error);
    }
};


// initalize starting city
updateWeatherDisplay("Toronto");