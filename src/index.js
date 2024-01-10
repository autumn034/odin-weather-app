import css from "./style.css";
async function getWeather(cityName) {
    try {
        const APIKey = "3cca2df03456fd625a7bbe7f00a970d4";

        // grab coordinates from city name
        let geocode = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${APIKey}`, {mode: "cors"});
        geocode = await geocode.json();
        let lat = geocode[0]["lat"];
        let lon = geocode[0]["lon"];    

        // grab weather data from coordinates
        let weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIKey}`, {mode: "cors"});
        weatherData = await weatherData.json();
        console.log(weatherData);

    } catch (error) {
        console.log(error);
    }
};

getWeather("Toronto")