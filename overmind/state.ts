import { WeatherInfo } from "../src/types";

type State = {
  weatherInfo: WeatherInfo | undefined;
};

export const state: State = {
  weatherInfo: undefined,
};
