const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = '968630a1bd2a7f8de3c85fef2a01329e';

weatherForm.addEventListener("submit", async event =>{ 
    event.preventDefault();
    const city = cityInput.value;
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);

        }
        catch(error){
            console.error(error);
            displayError(error);
        }

    }
    else{
        displayError("Please enter a city")
    }
});

async function getWeatherData(city) {
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response =await fetch(apiUrl);
    if (!response.ok){
        throw new Error("Could not fetch weather data");

    }
    return await response.json();

}

function displayWeatherInfo(data){
    const{name: city, main:{temp, humidity}, weather:[{description, id}]} =data;
    card.textContent= ' ';
    card.style.display = "flex";
    const CityDisplay = document.createElement("h1")
    const HumidityDisplay = document.createElement("p")
    const descDisplay = document.createElement("p")
    const tempDisplay = document.createElement("p")
    const WeatherEmoji = document.createElement("p")
    CityDisplay.textContent=city;
    tempDisplay.textContent=`${(temp-273.15).toFixed(1)}°C`;
    HumidityDisplay.textContent=`Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    WeatherEmoji.textContent = getWeatherEmoji(id);

    CityDisplay.classList.add("CityDisplay");
    tempDisplay.classList.add("tempDisplay");
    HumidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("decsDisplay");
    WeatherEmoji.classList.add("WeatherEmoji")

    card.appendChild(CityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(HumidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(WeatherEmoji);

    

}
function getWeatherEmoji(weatherID){
    switch(true){
        case (weatherID>=200 && weatherID<300):
            return "⛈️";
        case (weatherID>=300 && weatherID<400):
            return "🌧️";
        case (weatherID>=400 && weatherID<500):
            return "⛈️";
        case (weatherID>=500 && weatherID<600):
            return "⛈️";
        case (weatherID>=600 && weatherID<700):
            return "❄️⛄";
        case (weatherID>=700 && weatherID<800):
            return "🌫️";
        case (weatherID==800):
            return "☀️";
        case (weatherID>=801 && weatherID<810):
            return "☁️";
        default:
            return "Unknown weather";
        
    }

}
function displayError(message){
    const errorDisplay = document.createElement("p")
    errorDisplay.textContent =message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent='';
    card.style.display = 'flex';
    card.appendChild(errorDisplay);

}