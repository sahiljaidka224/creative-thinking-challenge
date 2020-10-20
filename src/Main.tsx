import React, { useEffect, useState } from "react";
import { getCurrentLocation, getWeatherInfo } from "./utils";

import { ActivityIndicator } from "react-native";
import { Constants } from "./constants";
import { StatusBar } from "expo-status-bar";
import { WeatherInfo } from "./types";
import { WeatherInfoView } from "./components";
import styled from "styled-components/native";

const BackgroundView = styled.SafeAreaView`
  flex: 1;
  background-color: ${Constants.COLOR.backgroundColor};
`;

export const Main = () => {
  const [weatherInfo, updateWeatherInfo] = useState<WeatherInfo | undefined>(
    undefined
  );
  const getResultForCurrentLocation = async () => {
    const locationData = await getCurrentLocation();

    // TODO: remove type of
    if (typeof locationData !== "string") {
      const weatherInfo = await getWeatherInfo(
        `${locationData.lat},${locationData.lng}`
      );
      updateWeatherInfo(
        typeof weatherInfo !== "string" ? weatherInfo : undefined
      );
    }
  };
  useEffect(() => {
    getResultForCurrentLocation();
  }, []);

  return (
    <BackgroundView>
      {weatherInfo ? <WeatherInfoView weatherInfo={weatherInfo} /> : <ActivityIndicator size="large"/>}
      <StatusBar style="auto" />
    </BackgroundView>
  );
};
