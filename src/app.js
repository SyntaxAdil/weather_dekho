// variables declaration
const cityIn = document.getElementById("city-in");
const submitBtn = document.getElementById("submit-btn");
const result = document.querySelector(".result");
const errorMssg = document.querySelector(".error");
const weatherConditionImage = document.getElementById("weather-conditon-img");
const cityDisplay = document.querySelector(".city-display");
const tempDisplay = document.querySelector(".temp-display");
const conditionDisplay = document.querySelector(".condition-display");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const pressure = document.querySelector(".pressure");
const dateDisplay = document.querySelector(".date");
const loading = document.querySelector(".loading");

// chnage weather condition Image
function changeImage(d) {
  if (d.weather[0].main === "Clouds") {
    weatherConditionImage.src = "./src/assets/images/clouds.png";
  } else if (d.weather[0].main === "Mist") {
    weatherConditionImage.src = "./src/assets/images/mist.png";
  } else if (d.weather[0].main === "Drizzle") {
    weatherConditionImage.src = "./src/assets/images/drizzle.png";
  } else if (d.weather[0].main === "Clear") {
    weatherConditionImage.src = "./src/assets/images/clear.png";
  } else if (d.weather[0].main === "Rain") {
    weatherConditionImage.src = "./src/assets/images/rain.png";
  } else {
    weatherConditionImage.src = "./src/assets/images/snow.png";
  }
}

// Display error message

function errorDisplay(d) {
  if (!d || !d.name || d.cod == "404" || !d.weather || !d.main) {
    errorMssg.style.display = "block";
    errorMssg.textContent = "City doesn't exists";
    result.style.display = "none";
    return;
  } else {
    errorMssg.style.display = "none";
    result.style.display = "block";
    changeImage(d);
  }
}

// Update weather

async function updateWeather() {
  if (cityIn.value.length === 0) {
    errorMssg.style.display = "block";
    errorMssg.textContent = "Please enter any city";
    result.style.display = "none";
    return;
  }
  let date = new Date();
  let apiKey = "&appid=4c243b03b05493db3d0f15e7bfd513d1&units=metric";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  loading.style.display = "flex";
  try {
    let res = await fetch(apiUrl + cityIn.value.trim() + apiKey);
    let data = await res.json();
    loading.style.display = "none";
    errorDisplay(data);

    cityDisplay.innerHTML = data.name;
    tempDisplay.innerHTML = Math.round(data.main.temp) + "℃";
    conditionDisplay.innerHTML = data.weather[0].main;
    humidity.innerHTML = data.main.humidity + "%";
    pressure.innerHTML = data.main.pressure + " hPa";
    wind.innerHTML = data.wind.speed + " m/s";
    dateDisplay.innerHTML = date.toLocaleDateString();

    result.style.display = "block";
  } catch (err) {
    errorMssg.style.display = "block";
    console.error("Error fetching weather:", err);
    result.style.display = "none";
    loading.style.display = "none";
  }
}

// Button event handle

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  updateWeather();
});
