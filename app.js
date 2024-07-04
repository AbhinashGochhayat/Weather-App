document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('location-form');
  const citySelect = document.getElementById('city-select');
  const cityName = document.getElementById('city-name');
  const temperature = document.getElementById('temperature');
  const description = document.getElementById('description');
  const humidity = document.getElementById('humidity');
  const windSpeed = document.getElementById('wind-speed');
  const weatherDisplay = document.getElementById('weather-display');

  form.addEventListener('submit', (e) => {
      e.preventDefault();
      const city = citySelect.value.trim();
      if (city) {
          fetchWeather(city);
      }
  });

  async function fetchWeather(city) {
      const apiKey = 'fa32f7b77369b1f7202a4d19daf8c314'; // Replace with your OpenWeatherMap API key
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      try {
          const response = await fetch(url);
          console.log('Response status:', response.status); // Log the response status
          if (!response.ok) {
              throw new Error(response.statusText);
          }
          const data = await response.json();
          console.log('API Response:', data); // Log the API response
          displayWeather(data);
      } catch (error) {
          console.error('Error:', error); // Log the error
          displayError(error.message);
      }
  }

  function displayWeather(data) {
      cityName.textContent = `Weather in ${data.name}`;
      temperature.textContent = `Temperature: ${data.main.temp}°C`;
      description.textContent = `Description: ${data.weather[0].description}`;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
      windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
      weatherDisplay.style.display = 'block';
  }

  function displayError(message) {
      cityName.textContent = message;
      temperature.textContent = '';
      description.textContent = '';
      humidity.textContent = '';
      windSpeed.textContent = '';
      weatherDisplay.style.display = 'block';
  }
});
