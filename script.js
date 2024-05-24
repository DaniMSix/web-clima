const apiKey = "383e2e064489e22ccb1f50c336369ccf";

function getCurrentWeather() {
  const city = document.getElementById("city").value;
  if (!city) {
    alert("Por favor, ingresa el nombre de una ciudad");
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=es&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) {
        document.getElementById("current-weather").innerHTML = `
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <p><strong>Temperatura:</strong> ${data.main.temp}°C</p>
                    <p><strong>Clima:</strong> ${data.weather[0].description}</p>
                    <p><strong>Humedad:</strong> ${data.main.humidity}%</p>
                    <img class="weather-icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
                `;
      } else {
        document.getElementById(
          "current-weather"
        ).innerHTML = `<p>Ciudad no encontrada</p>`;
      }
    })
    .catch((error) => console.error("Error:", error));
}

function getForecast() {
  const city = document.getElementById("city").value;
  if (!city) {
    alert("Por favor, ingresa el nombre de una ciudad");
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&lang=es&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "200") {
        let forecastHTML = `<h2>Pronóstico para ${data.city.name}, ${data.city.country}</h2>`;
        forecastHTML += `<div class="forecast-container">`;

        const forecastDays = {};

        data.list.forEach((forecast) => {
          const date = new Date(forecast.dt_txt).toLocaleDateString();
          if (!forecastDays[date]) {
            forecastDays[date] = [];
          }
          forecastDays[date].push(forecast);
        });

        for (const date in forecastDays) {
          forecastHTML += `<div class="forecast-day"><h3>${date}</h3>`;
          forecastDays[date].forEach((forecast) => {
            forecastHTML += `
                            <p><strong>${new Date(
                              forecast.dt_txt
                            ).toLocaleTimeString()}</strong>: ${
              forecast.main.temp
            }°C, ${forecast.weather[0].description}</p>
                            <img class="weather-icon" src="http://openweathermap.org/img/wn/${
                              forecast.weather[0].icon
                            }@2x.png" alt="${forecast.weather[0].description}">
                        `;
          });
          forecastHTML += `</div>`;
        }

        forecastHTML += `</div>`;
        document.getElementById("forecast-weather").innerHTML = forecastHTML;
      } else {
        document.getElementById(
          "forecast-weather"
        ).innerHTML = `<p>Ciudad no encontrada</p>`;
      }
    })
    .catch((error) => console.error("Error:", error));
}
