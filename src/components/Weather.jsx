import axios from 'axios';
import { useEffect, useState } from 'react';

const Weather = () => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (err) => {
          console.log('위치 정보를 가져올 수 없습니다. =>', err);
        }
      );
    } else {
      console.log('Geolocation을 지원하지 않는 브라우저입니다.');
    }
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      if (location) {
        const { latitude, longitude } = location;
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}&lang=kr`
          );
          setWeather(response.data);
        } catch (err) {
          console.log('날씨 정보를 가져올 수 없습니다. =>', err);
        }
      }
    };

    fetchWeather();
  }, [location, apiKey]);

  if (!weather) {
    return <div>날씨 정보를 불러오는 중...</div>;
  }

  const { name: weatherCity, main, weather: weatherDetails } = weather;
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherDetails[0].icon}@2x.png`;

  return (
    <header className="flex items-center space-x-4">
      <div>
        <p className="font-bold">
          {weatherCity} {main.temp}°C {weatherDetails[0].description}
        </p>
      </div>
      <img
        src={weatherIconUrl}
        alt="weather icon"
        className="w-8 h-8"
        style={{
          marginLeft: '0px'
        }}
      />
    </header>
  );
};

export default Weather;
