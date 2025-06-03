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