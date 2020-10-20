import { Constants } from "../constants";
import { WeatherInfo } from "../types";

export const getWeatherInfo = async (
  location: string
): Promise<WeatherInfo | string> => {
  try {
    const response = await fetch(`${Constants.API_BASE_URL}${location}`);

    if (
      !response ||
      !response.status ||
      response.status !== Constants.SUCCESS_CODE
    ) {
      return Constants.NETWORK_ERROR;
    }

    const data = await response.json();

    if (!data.location || !data.current) return Constants.NETWORK_ERROR;

    return {
      location: {
        city: data.location.name,
        region: data.location.region,
        country: data.location.country,
      },
      temperature: data.current.temperature,
      uvIndex: data.current.uv_index,
      visibility: data.current.visibility,
      weatherDescription: data.current.weather_descriptions,
      weatherIcons: data.current.weather_icons,
      windSpeed: data.current.wind_speed,
    };
  } catch (err) {
    return Constants.NETWORK_ERROR;
  }
};
