document.addEventListener('DOMContentLoaded', function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  });
  
  function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    fetchWeather(lat, lon);
  }
  
  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  }
  
  function fetchWeather(lat, lon) {
    document.getElementById('loading-spinner').style.display = 'block';
    
    const apiKey = 'YOUR_API_KEY'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        document.getElementById('loading-spinner').style.display = 'none';
        document.querySelector('.weather-info').style.display = 'block';
        document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
        document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
        document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} km/h`;
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
        document.getElementById('loading-spinner').style.display = 'none';
        alert("Error fetching weather data. Please check the console for details.");
      });
  }
  
  document.getElementById('get-weather-btn').addEventListener('click', function() {
    const location = document.getElementById('location-input').value;
    if (location) {
      const apiKey = '6c6b130f61190bd66d7cd89e72c615df'; 
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          document.getElementById('loading-spinner').style.display = 'none';
          document.querySelector('.weather-info').style.display = 'block';
          document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
          document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
          document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} km/h`;
        })
        .catch(error => {
          console.error("Error fetching weather data:", error);
          document.getElementById('loading-spinner').style.display = 'none';
          alert("Error fetching weather data. Please check the console for details.");
        });
    } else {
      alert("Please enter a location.");
    }
  });