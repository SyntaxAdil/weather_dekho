// variables declaration
const mainSection = document.getElementById("main-section");
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
    mainSection.style.backgroundImage =
      "linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7)),url('./src/assets/images/cloud-sky.jpg')";
  } else if (d.weather[0].main === "Mist") {
    weatherConditionImage.src = "./src/assets/images/mist.png";
    mainSection.style.backgroundImage =
      "linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7)),url('./src/assets/images/mist-sky.jpg')";
  } else if (d.weather[0].main === "Drizzle") {
    weatherConditionImage.src = "./src/assets/images/drizzle.png";
    mainSection.style.backgroundImage =
      "linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7)),url('./src/assets/images/drizzle-sky.jpg')";
  } else if (d.weather[0].main === "Clear") {
    weatherConditionImage.src = "./src/assets/images/clear.png";
    mainSection.style.backgroundImage =
      "linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.3)),url('./src/assets/images/free-sky.jpg')";
  } else if (d.weather[0].main === "Rain") {
    weatherConditionImage.src = "./src/assets/images/rain.png";
    mainSection.style.backgroundImage =
      "linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7)),url('./src/assets/images/rainy-sky.jpg')";
  } else if (d.weather[0].main === "Fog") {
    weatherConditionImage.src = "./src/assets/images/rain.png";
    mainSection.style.backgroundImage =
      "linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7)),url('./src/assets/images/fog-sky.jpg')";
  } else if (d.weather[0].main === "Snow") {
    weatherConditionImage.src = "./src/assets/images/rain.png";
    mainSection.style.backgroundImage =
      "linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7)),url('./src/assets/images/snow-sky.jpg')";
  } else {
    weatherConditionImage.src = "./src/assets/images/snow.png";
    mainSection.style.backgroundImage =
      "linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.5)),url('./src/assets/images/weather-bg.jpg')";
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
