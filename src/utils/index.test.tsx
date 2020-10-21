import { Constants } from "../constants";
import { getWeatherInfo } from "./";

describe("Weather info test", () => {
  test("Function should throw error with empty string", () => {
    return getWeatherInfo("").then((data) => {
      expect(data).toBe(Constants.NETWORK_ERROR);
    });
  });
});
