const apiKey = '07c4895d180d296e163e437a2f55b175'; // your API key here

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');

const cityName = document.getElementById('cityName');
const currentDate = document.getElementById('currentDate');
const temp = document.getElementById('temp');
const feelsLike = document.getElementById('feelsLike');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const pressure = document.getElementById('pressure');
const visibility = document.getElementById('visibility');
const forecastGrid = document.getElementById('forecastGrid');
const toggleNight = document.getElementById('toggleNight');

async function fetchWeather(city) {
  try {
    const currentRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    const currentData = await currentRes.json();

    if (currentData.cod !== 200) {
      alert('City not found! Please try again.');
      return;
    }

    updateCurrentUI(currentData);

    const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
    const forecastData = await forecastRes.json();

    updateForecastUI(forecastData);

  } catch (error) {
    alert('Error fetching data. Check your internet or API key.');
  }
}

function updateCurrentUI(data) {
  currentDate.textContent = new Date().toDateString();
  temp.textContent = `${Math.round(data.main.temp)}°C`;
  feelsLike.textContent = `Feels like ${Math.round(data.main.feels_like)}°C`;
  humidity.textContent = `${data.main.humidity}%`;
  wind.textContent = `${data.wind.speed} km/h`;
  pressure.textContent = `${data.main.pressure} hPa`;
  visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;

  changeBackground(data.weather[0].main);
}

function updateForecastUI(data) {
  forecastGrid.innerHTML = '';

  const daily = {};

  data.list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!daily[date]) {
      daily[date] = item;
    }
  });

  const dates = Object.keys(daily).slice(0, 5); // Next 5 days

  dates.forEach(date => {
    const weather = daily[date];
    const div = document.createElement('div');
    div.classList.add('forecast-day');
    div.innerHTML = `
      <p>${new Date(weather.dt_txt).toLocaleDateString('en-GB', { weekday: 'short' })}</p>
      <img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" alt="icon">
      <p>${Math.round(weather.main.temp_min)}° / ${Math.round(weather.main.temp_max)}°</p>
    `;
    forecastGrid.appendChild(div);
  });
}

function changeBackground(condition) {
  if (condition === 'Clear') {
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=1920&q=80')";
  } else if (condition === 'Clouds') {
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?fit=crop&w=1920&q=80')";
  } else if (condition === 'Rain') {
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1527766833261-b09c3163a791?fit=crop&w=1920&q=80')";
  } else if (condition === 'Snow') {
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1608889175657-294b69ecf3a5?fit=crop&w=1920&q=80')";
  } else if (condition === 'Thunderstorm') {
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1595433707802-9bba3fa9a7c1?fit=crop&w=1920&q=80')";
  } else {
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=1920&q=80')";
  }
}

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});

toggleNight.addEventListener('click', () => {
  document.body.classList.toggle('night');
});
