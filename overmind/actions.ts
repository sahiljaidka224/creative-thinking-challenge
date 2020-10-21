import { Action } from "overmind";
import { WeatherInfo } from "../src/@types";

export const updateWeatherInfo: Action<WeatherInfo | undefined> = ({ state }, weatherInfo) => {
  state.weatherInfo = weatherInfo;
};
