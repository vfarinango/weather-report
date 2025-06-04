const updateLocationCard = () => {
    const currentCity = document.getElementById('current-city');
    const cityInput = document.getElementById('city-input');
    
    if (currentCity && cityInput) {
        const inputValue = cityInput.value;
        currentCity.textContent = inputValue;
    } else {
        console.error("Missing HTML elements: 'current-city or -city-input' not found.");
    }

    document.getElementById('current-city').textContent = inputValue;
}

const cityInput = document.getElementById('city-input');
if (cityInput) {
    cityInput.addEventListener('input', updateLocationCard);
} else {
    console.error("Input element with ID 'city-input' not found. Cannot attach event listener.");
}

document.addEventListener('DOMContentLoaded', () => {
    const currentCity = document.getElementById('current-city');
    if (currentCity) {
        currentCity.textContent = "New York City";
    }
});