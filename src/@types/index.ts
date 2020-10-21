export type Location = {
  city: string;
  region: string;
  country: string;
};

export type WeatherInfo = {
  location: Location;
  temperature: number;
  uvIndex: number;
  visibility: number;
  weatherDescription: string[];
  weatherIcons: string[];
  windSpeed: string;
};

export type Point = {
  lat: number;
  lng: number;
};
