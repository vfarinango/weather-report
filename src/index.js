"use strict";

let temperature = 73;

const tempDisplay = document.getElementById("temperature");
const tempUpBtn = document.getElementById("temp-up");
const tempDownBtn = document.getElementById("temp-down");
const groundEmoji = document.getElementById("ground-emoji");

const updateTemperature = () => {
  tempDisplay.innerHTML = `${temperature}&deg;F`;

  if (temperature >= 80) {
    tempDisplay.style.color = "red";
    groundEmoji.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
  } else if (temperature >= 70) {
    tempDisplay.style.color = "orange";
    groundEmoji.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
  } else if (temperature >= 60) {
    tempDisplay.style.color = "yellow";
    groundEmoji.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
  } else if (temperature >= 50) {
    tempDisplay.style.color = "green";
    groundEmoji.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
  } else {
    tempDisplay.style.color = "teal";
    groundEmoji.textContent = "⛄️⛄️⛄️";
  }
};

tempUpBtn.addEventListener("click", () => {
  temperature += 1;
  updateTemperature();
});

tempDownBtn.addEventListener("click", () => {
  temperature -= 1;
  updateTemperature();
});

updateTemperature();


// Wave 3 - City Input //
const updateLocationCard = () => {
    const currentCity = document.getElementById('current-city');
    const cityInput = document.getElementById('city-input');
    
    if (currentCity && cityInput) {
        const inputValue = cityInput.value;
        currentCity.textContent = inputValue;
    } else {
        console.error("Missing HTML elements: 'current-city or -city-input' not found.");
    }
};

const cityInput = document.getElementById('city-input');
if (cityInput) {
    cityInput.addEventListener('input', updateLocationCard);
} else {
    console.error("Input element with ID 'city-input' not found. Cannot attach event listener.");
};

document.addEventListener('DOMContentLoaded', () => {
    const currentCity = document.getElementById('current-city');
    if (currentCity) {
        currentCity.textContent = "New York City";
    }
});

// Wave 4: API Call
// const promiseResult = axios.get();

// const handleResult = (response) => {
//   /// use the contents of the response
// }

// const promiseAfterThen = promiseResult.then(handleResult);


const realTimeBtn = getElementById('realtime-btn');
const currentCityDisplay = getElementById('current-city');
const temperatureDisplay = getElementById('temperature');


const PROXY_SERVER_BASE_URL = 'http://127.0.0.1:5000';

const weatherButtonEvent = () => {
  if (realTimeBtn) {
    realTimeBtn.addEventListener('click', fetchWeatherData);
  } else {
  console.error("Weather button with ID 'get-weather-btn' not found.");
  };
};