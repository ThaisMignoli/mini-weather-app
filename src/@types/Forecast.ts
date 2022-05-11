export interface Forecast {
  current: Current,
  today:   Today,
}

export interface Current {
  dt:         number;
  temp:       number;
  feels_like: number;
  humidity:   number;
  clouds:     number;
  wind_speed: number;
  weather:    Weather;
}

export interface Weather {
  description: string;
  icon:        string;
  id:          number;
}

export interface FeelsLike {
  day:   number,
  night: number,
  eve:   number,
  morn:  number,
}

export interface Today {
  temp:       Temp;
  feels_like: FeelsLike;
  pop:        number;
}

export interface Temp {
  day:   number;
  min:   number;
  max:   number;
  night: number;
  eve:   number;
  morn:  number;
}