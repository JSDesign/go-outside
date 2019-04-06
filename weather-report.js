// get a free API key to use with https://api.openweathermap.org

// PREP FETCH #1
async function getIpData(url) {
  try {
    let response = await fetch(url);
    return await response.text();
  } catch (err) {
    console.error(err.message);
  }
}

// PREP FETCH #2
async function getWeatherData(url) {
  try {
    let response = await fetch(url);
    return await response.text();
  } catch (err) {
    console.error(err.message);
  }
}

function degreesFahrenheit(degrees) {
  return degreesF = Math.round((degrees * (9 / 5)) - 459.67);
}
function degreesCelsius(degrees) {
  return degreesC = Math.round(degrees - 273.15);
}

// FETCH #1
getIpData('https://ipapi.co/json/')
  .then((data) => {
    data = JSON.parse(data);
    document.getElementById('locationData')
      .innerHTML = `Hello ${data.city}, ${data.region}!`;
    return data;
  })
  .then((data) => {
    let latitude = data.latitude;
    let longitude = data.longitude;
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=<YOUR_API_KEY>`;
    console.log(weatherUrl);
    // FETCH #2
    getWeatherData(weatherUrl)
      .then((data) => {
        data = JSON.parse(data);
        document.getElementById('weatherDataMain')
          .innerHTML = `${data.weather[0].main}`;
        document.getElementById('weatherDataDesc')
          .innerHTML = `(${data.weather[0].description})`;

        let iconId = data.weather[0].id;
        document.getElementById('weatherIcon')
          .innerHTML = `<i class="wi wi-owm-${iconId}"></i>`;

        let degrees = data.main.temp;
        let degreesElement = document.getElementById('degrees');
        let switcher = document.getElementById('switcher');

        // defaults
        let format = 'fahrenheit';
        degreesElement.innerHTML = `${degreesFahrenheit(degrees)}&deg; F`;

        switcher.addEventListener('click', (event) => {
          event.preventDefault();
          if (format === 'fahrenheit') {
            degreesElement.innerHTML = `${degreesCelsius(degrees)}&deg; C`;
            format = 'celsius';
          } else {
            degreesElement.innerHTML = `${degreesFahrenheit(degrees)}&deg; F`;
            format = 'fahrenheit';
          }
        });

      });
  })
  .catch((err) => {
    console.error(err.message);
    document.getElementById('appBox')
      .innerHTML = `<p>By the way, because this app is trying to use your location (derived from your IP address), if you're using an ad/content blocker (as all normal, sane internet users should), you may not see any actual weather data here.</p>`;
  });
