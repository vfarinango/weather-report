"use strict";

let temperature = 73;

const tempDisplay = document.getElementById("temperature");
const tempUpBtn = document.getElementById("temp-up");
const tempDownBtn = document.getElementById("temp-down");
const groundEmoji = document.getElementById("ground-emoji");

const cityInput = document.getElementById("city-input");
const currentCityDisplay = document.getElementById("current-city");
const realTimeBtn = document.getElementById("get-realtime-btn");

const PROXY_SERVER_BASE_URL = 'http://127.0.0.1:5000';


// Wave2
const updateTemperatureVisuals = () => {
  const tempC = Math.round((temperature - 32) * 5 / 9);
  tempDisplay.innerHTML = `${temperature}&deg;F<br>⎯<br>${tempC}&deg;C`;

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


// changing temperature buttons
tempUpBtn.addEventListener("click", () => {
  temperature += 1;
  updateTemperatureVisuals();
});

tempDownBtn.addEventListener("click", () => {
  temperature -= 1;
  updateTemperatureVisuals();
});

updateTemperatureVisuals();

// Wave 3
const updateLocationCard = () => {
  if (currentCityDisplay && cityInput) {
    currentCityDisplay.textContent = cityInput.value;
  }
};

if (cityInput) {
  cityInput.addEventListener('input', updateLocationCard);
}


// Wave 4

const getWithRetry = (url, queryParams, attempt = 1) => {
  return axios.get(url, { params: queryParams }).then((response) => {
    const data = response.data;

    if (data.error) {
      if (attempt >= 5) {
        console.log("Max attempts reached!");
        return null;
      }
      console.log(`Retrying ${attempt}...`);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(getWithRetry(url, queryParams, attempt + 1));
        }, 600 * attempt);
      });
    }

    return response;
  });
};

// Get coordinates
const findLatitudeAndLongitude = (cityName) => {
  const url = `${PROXY_SERVER_BASE_URL}/location`;
  return getWithRetry(url, { q: cityName, format: 'json' }).then((response) => {
    if (!response?.data?.[0]) {
      console.error("No lat/lon found for city.");
      return null;
    }

    const { lat, lon } = response.data[0];
    return { lat, lon };
  });
};

// Get weather report
const findWeatherLatLon = (lat, lon) => {
  const url = `${PROXY_SERVER_BASE_URL}/weather`;
  return getWithRetry(url, { lat, lon }).then((response) => {
    if (!response?.data?.main?.temp) {
      console.error("Weather data not found.");
      return null;
    }

    const tempK = response.data.main.temp;
    const tempC = Math.round(tempK - 273.15);
    const tempF = Math.round((tempC * 9) / 5 + 32);
    return { tempF, tempC };
  });
};

//"Get Realtime Temperature" button
const fetchWeatherData = () => {
  const city = currentCityDisplay.textContent.trim();
  if (!city) return;

  findLatitudeAndLongitude(city)
    .then((coords) => {
      if (!coords) return;
      return findWeatherLatLon(coords.lat, coords.lon);
    })
    .then((result) => {
      if (!result) return;
      temperature = result.tempF;
      updateTemperatureVisuals();
    });
};

if (realTimeBtn) {
  realTimeBtn.addEventListener('click', fetchWeatherData);
} else {
  console.error("Button with ID 'get-realtime-btn' not found.");
}

// Wave 5: Changing Sky
const skyOptionsMap = {
  'cloudy': "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️",
  'sunny': "☁️ ☁️ ☁️ ☀️ ☁️ ☁️",    
  'rainy': "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧", 
  'snowy': "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨"
};

const handleSkySelection = () => {
  const skySelect = document.getElementById('sky-select');
  const skyEmojiDisplay = document.getElementById('sky-emoji');

  if (skySelect && skyEmojiDisplay) {
    const selectedSkyOption = skySelect.value;
    const selectedSkyVisual = skyOptionsMap[selectedSkyOption];
    
    skyEmojiDisplay.textContent = selectedSkyVisual;
  };
};

const setupSkySelection = () => {
  const skySelect = document.getElementById('sky-select');
  const skyEmojiDisplay = document.getElementById('sky-emoji');

  if (skySelect) {
    skySelect.addEventListener('change', handleSkySelection);

    handleSkySelection();
  } else {
    console.error("Sky select element with ID 'sky-select' not found. Cannot attach event listener.");
  };
};

document.addEventListener('DOMContentLoaded', () => {
  setupSkySelection();
});