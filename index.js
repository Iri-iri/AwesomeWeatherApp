const api = {
  key: "123eb0c25a954ebc9655135f457a8de3",
  base: "https://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector(".search-box");
const info = document.querySelector(".weather-info");

const dateBuilder = (d) => {
  const months = [
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
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
};


const displayResults = (weather) => {
  const now = new Date();
  info.innerHTML = `
              <div class="location">
                <div class="city">${weather.name}, ${weather.sys.country}</div>
                <div class="date"> ${dateBuilder(now)} </div>
              </div>
              <div class="current">
                <div class="temp">${Math.round(weather.main.temp) - 273}<span>°c</span></div>
                <div class="weather">${weather.weather[0].main}</div>
                <div class="hi-low">${Math.round(weather.main.temp_min) - 273}°c / ${ Math.round(weather.main.temp_max) - 273}<span>°c</span></div>
              </div>`
};


const getResults = async (query) => {
  try {
    const response = await fetch(
      `${api.base}weather?q=${query}&appid=${api.key}`
    );
    const weather = await response.json();
    displayResults(weather);
  } catch (error) {
    const modalError = document.querySelector("#error-no-value");
    const closeError = document.querySelector("#close-error");
    modalError.style.display = "block";
    closeError.addEventListener("click", () => {
      modalError.style.display = "none";
    });
  };
};

const setQuery = () => {
      getResults(searchbox.value);
  };

document.querySelector("#search").addEventListener("click", () => {
  info.innerHTML = "";
  setQuery();
  searchbox.value = "";
})