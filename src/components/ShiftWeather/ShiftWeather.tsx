import React from "react";

import { 
  Container, 
  ShiftIcon, 
  TemperatureWrapper,
  Temperature
} from "./styles";

interface Props {
  weatherCode: number;
  shift: string;
  temperature: string;
  feelsLike: string;
}

const Icon = {
  day: "sun",
  night: "moon",
  eve: "sunset",
  morn: "sunrise"
}

const ShiftWeather = ({ weatherCode, shift, temperature, feelsLike }: Props) => {
  return (
    
    <Container WeatherCode={weatherCode}>
      <ShiftIcon name={Icon[shift]} />
      <TemperatureWrapper>
        <Temperature>{temperature}ºC</Temperature>
        <Temperature>Feels Like {feelsLike}ºC</Temperature>
      </TemperatureWrapper>
    </Container>
  )
}

export default ShiftWeather;