import React from "react";
import { WeatherInfo } from "../../@types";
import { WeatherInfoView } from "./";
import renderer from "react-test-renderer";

const weatherInfo: WeatherInfo = {
  location: {
    city: "Melbourne",
    region: "Victoria",
    country: "Australia",
  },
  temperature: 10,
  uvIndex: 5,
  visibility: 10,
  weatherDescription: ["Cloudy"],
  weatherIcons: [""],
  windSpeed: "10",
};

describe("Weather Info tests", () => {
  it("renders successfully", () => {
    const rendered = renderer
      .create(<WeatherInfoView weatherInfo={weatherInfo} />)
      .toJSON();
    expect(rendered).toBeTruthy();
  });
});
