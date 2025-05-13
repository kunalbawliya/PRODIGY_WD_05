// Theme toggle
const toggle = document.getElementById("themeToggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  toggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// Autocomplete
const cityInput = document.getElementById("cityInput");
const suggestions = document.getElementById("suggestions");

cityInput.addEventListener("input", () => {
  const input = cityInput.value.toLowerCase();
  suggestions.innerHTML = "";

  if (input.length === 0) return;

  const filteredCities = cities.filter(city =>
    city.toLowerCase().startsWith(input)
  );

  filteredCities.forEach(city => {
    const li = document.createElement("li");
    li.textContent = city;
    li.addEventListener("click", () => {
      cityInput.value = city;
      suggestions.innerHTML = "";
    });
    suggestions.appendChild(li);
  });
});

// Weather Fetch
document.getElementById("searchBtn").addEventListener("click", () => {
  const city = cityInput.value;
  const apiKey = "07c4895d180d296e163e437a2f55b175";

  if (!city) return alert("Please enter a city!");

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) {
        alert("City not found!");
        return;
      }

      document.getElementById("weatherCard").classList.remove("hidden");
      document.getElementById("cityName").textContent = `📍 ${data.name}`;
      document.getElementById("weatherDesc").textContent = `☁️ ${data.weather[0].description}`;
      document.getElementById("temperature").textContent = `🌡️ Temp: ${data.main.temp}°C`;
      document.getElementById("humidity").textContent = `💧 Humidity: ${data.main.humidity}%`;
      document.getElementById("windSpeed").textContent = `💨 Wind: ${data.wind.speed} m/s`;
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Something went wrong. Try again!");
    });
});
