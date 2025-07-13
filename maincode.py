import requests
from dotenv import load_dotenv
import os
from dataclasses import dataclass

load_dotenv()
API_KEY = os.getenv('API_KEY')

@dataclass
class WeatherData:
    main: str
    description: str
    icon: str
    temp: float
    pressure: float
    humidity: float
    sea_level: float
    grnd_level: float
    speed: float
    deg: float

def get_lat_lon(city_name, state_code, country_code, API_KEY):
    url = f'http://api.openweathermap.org/geo/1.0/direct?q={city_name},{state_code},{country_code}&appid={API_KEY}'
    response = requests.get(url).json()
    if not response:
        raise ValueError("No data found for the given location.")
    data = response[0]
    lat, lon = data.get('lat'), data.get('lon')
    return lat, lon

def get_current_weather(lat, lon, API_KEY):
    url_1 = f'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric'
    response = requests.get(url_1).json()

    # Debugging the response format
    print(response)
    
    # Ensure all necessary keys are present
    weather = response.get('weather', [{}])[0]
    main = response.get('main', {})
    wind = response.get('wind', {})

    data = WeatherData(
        main=weather.get('main', 'N/A'),
        description=weather.get('description', 'N/A'),
        icon=weather.get('icon', 'N/A'),
        temp=main.get('temp', 0.0),
        pressure=main.get('pressure', 0.0),
        humidity=main.get('humidity', 0.0),
        sea_level=main.get('sea_level', 0.0),
        grnd_level=main.get('grnd_level', 0.0),
        speed=wind.get('speed', 0.0),
        deg=wind.get('deg', 0.0)
    )
    return data

def main(city_name, state_code, country_code):
    lat, lon = get_lat_lon(city_name, state_code, country_code, API_KEY)
    weather_data = get_current_weather(lat, lon, API_KEY)
    return weather_data
