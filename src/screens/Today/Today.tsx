import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { RefreshControl } from "react-native";
import * as Location from 'expo-location';

import { api } from "../../services/api";
import { Forecast } from "../../@types/Forecast";
import { handleError } from "../../utils/handleError";

import ShiftWeather from "../../components/ShiftWeather/ShiftWeather";
import Condition from "../../components/Condition/Condition";

import { 
  Container, 
  ForecastWrapper, 
  CurrentWrapper,
  LocationWrapper,
  LocationIcon,
  LocationName,
  Title, 
  TemperatureWrapper, 
  Temperature, 
  TodayIcon, 
  ConditionWrapper, 
  TodayWeatherWrapper, 
  UpdatedAt, 
} from "./styles";

const { API_KEY } = process.env;

interface LocationInfo {
  name: string;
  state: string;
}

 const Today = () => {
  const [weatherData, setWeatherData] = useState<Forecast>();
  const [locationData, setLocationData] = useState<LocationInfo>();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const theme = useTheme();

  async function loadData() {
    try {
      setIsRefreshing(true);

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        throw new Error('Permission to access location was denied');
      }

      const {coords: { latitude, longitude }} = await Location.getCurrentPositionAsync({});

      const [{ data: { current, daily: [ today ] } }, { data: [ { name, state } ] }] = await Promise.all(
        [
          api.get(`/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely,hourly,alert&appid=${API_KEY}`), 
          api.get(`/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=0&appid=${API_KEY}`)
        ])

      setWeatherData({ current, today })
      setLocationData({ name, state });

      setIsRefreshing(false);
    } catch (error) {
      handleError(error);
    }
  }

  const weatherCode = weatherData?.current.weather[0].id;
  const description = weatherData?.current.weather[0].description;
  const currentTemperature = weatherData?.current.temp.toFixed(0);
  const currentFeelsLike = weatherData?.current.feels_like.toFixed(0);
  const currentIcon = weatherData?.current.weather[0].icon;
  const todayMax = weatherData?.today.temp.max.toFixed(0);
  const todayMin = weatherData?.today.temp.min.toFixed(0);

  const mornTemp = {
    shift: 'morn', 
    temp: weatherData?.today.temp.morn.toFixed(0), 
    feelsLike: weatherData?.today.feels_like.morn.toFixed(0)
  }
  const dayTemp = {
    shift: 'day', 
    temp: weatherData?.today.temp.day.toFixed(0), 
    feelsLike: weatherData?.today.feels_like.day.toFixed(0)
  }
  const eveTemp = {
    shift: 'eve', 
    temp: weatherData?.today.temp.eve.toFixed(0), 
    feelsLike: weatherData?.today.feels_like.eve.toFixed(0)
  }
  const nightTemp = {
    shift: 'night', 
    temp: weatherData?.today.temp.night.toFixed(0), 
    feelsLike: weatherData?.today.feels_like.night.toFixed(0)
  }

  const todayTempArray = [mornTemp, dayTemp, eveTemp, nightTemp];

  const wind = `${(weatherData?.current.wind_speed*3.6).toFixed(2)}km/h`;
  const humidity = `${weatherData?.current.humidity}%`;
  const clouds = `${weatherData?.current.clouds}%`;
  const rain = `${(weatherData?.today.pop*100).toFixed(0)}%`;
  const currentDate = (new Date(weatherData?.current.dt*1000).toLocaleDateString());
  const currentTime = (new Date(weatherData?.current.dt*1000).toLocaleTimeString());

  function renderTodayWeather() {
    return React.Children.toArray(todayTempArray.map(({ shift, temp, feelsLike}) =>  
      <ShiftWeather shift={shift} weatherCode={weatherCode} temperature={temp} feelsLike={feelsLike}/>
    ))
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container WeatherCode={weatherCode}>
      <ForecastWrapper refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={loadData}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        }>
        {weatherData && 
          <>
            <CurrentWrapper>
              <LocationWrapper>
                <LocationIcon name='map-pin'/>
                <LocationName>{locationData?.name} / {locationData?.state}</LocationName>
              </LocationWrapper>

              <Title>{description}</Title>

              <TemperatureWrapper>
                <Temperature>{currentTemperature}º</Temperature>
                <TodayIcon source={{uri: `http://openweathermap.org/img/wn/${currentIcon}@2x.png`}}/>
              </TemperatureWrapper>

              <Title>{todayMax}º/{todayMin}º Feels like {currentFeelsLike}º</Title>

              <ConditionWrapper>
                <Condition icon="wind" title="Wind" text={wind}/>
                <Condition icon="droplet" title="Humidity" text={humidity}/>
                <Condition icon="cloud" title="Clouds" text={clouds}/>
                <Condition icon="cloud-rain" title="Rain" text={rain}/>
              </ConditionWrapper>

            </CurrentWrapper>

            <TodayWeatherWrapper>
              {renderTodayWeather()}
              <UpdatedAt>Updated at {currentDate} {currentTime}</UpdatedAt>
            </TodayWeatherWrapper>
          </>
        }
      </ForecastWrapper>
    </Container>
  )
}

export default Today;