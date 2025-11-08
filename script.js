const apiKey = "b1d0d961d77723e590c15d65fa192505";
const cities = [ "New York, London, East London, Cape Town, Sydney, Mumbai, Tokyo, Paris, Berlin, Moscow" ];
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherResult = document.getElementById("weather-result");

searchBtn.addEventListener("click", getWeather);

function getWeather() {
  const city = cityInput.value.trim();
  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},London&units=metric&appid=${apiKey}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); // Check the API response in the console
      weatherResult.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
      `;
    })
    .catch((error) => {
      weatherResult.innerHTML = `<p>Error: ${error.message} ⚠️</p>`;
      console.error("Error fetching weather:", error);
    });
}
