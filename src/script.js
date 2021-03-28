let displayDate = document.querySelector("#current-date");
let now = new Date();
let days = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur"];
let day = days[now.getDay()];
let date = now.getDate();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];
let year = now.getFullYear();
displayDate.innerHTML = `${day}day ${date} ${month} ${year}`;

let hour = now.getHours();
let minutes = now.getMinutes();
let displayTime = document.querySelector("#current-time");
if (hour < 11) {
  displayTime.innerHTML = `${hour}:${minutes}am`;
} else {
  displayTime.innerHTML = `${hour}:${minutes}pm`;
}

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempLabel = document.querySelector("#tempNumber");
  tempLabel.innerHTML = `${temperature}`;
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-text-input");
  let city = document.querySelector(".city");
  city.innerHTML = `${cityInput.value}`;
  let apiKey = "05b2d84074d57dc1bc94501e1935bc48";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
function retrievePosition(position) {
  let apiKey = "05b2d84074d57dc1bc94501e1935bc48";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  let city = response.data.name;
  let temp = Math.round(((response.data.main.temp - 32) / 8) * 5);
  let currentCityLabel = document.querySelector(".city");
  let currentTempLabel = document.querySelector("#tempNumber");
  currentCityLabel.innerHTML = `${city}`;
  currentTempLabel.innerHTML = `${temp}`;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
let button = document.querySelector("#current-location-button");
button.addEventListener("click", getCurrentLocation);
