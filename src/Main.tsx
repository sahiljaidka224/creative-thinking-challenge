import React, { useEffect, useState } from "react";
import {
  getCurrentLocation,
  getLocationPermission,
  getWeatherInfo,
} from "./utils";

import { ActivityIndicator } from "react-native";
import { Constants } from "./constants";
import { NavigationProp } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { WeatherInfo } from "./@types";
import { WeatherInfoView } from "./components";
import styled from "styled-components/native";

type Props = {
  navigation: NavigationProp<any, any>;
};

const BackgroundView = styled.SafeAreaView`
  flex: 1;
  background-color: ${Constants.COLOR.backgroundColor};
`;

const WeatherInfoWrapper = styled.View`
  display: flex;
  flex: 2;
`;

const ChangeLocationViewWrapper = styled.View`
  display: flex;
  flex: 0.5;
  justify-content: center;
  align-items: center;
`;

const Clickable = styled.TouchableOpacity`
  width: 90%;
  height: 50px;
  border-radius: 10px;
  background-color: royalblue;
  justify-content: center;
  align-items: center;
`;

const ChangeLocationText = styled.Text`
  color: white;
  font-size: 20px;
`;

const WeatherInfoHeading = styled.Text`
  font-size: 30px;
  margin: 15px;
  color: #16394c;
`;

export const Main: React.FC<Props> = ({ navigation }) => {
  const [weatherInfo, updateWeatherInfo] = useState<WeatherInfo>();

  const getWeatherInfoForCurrentLocation = async (location: string) => {
    const weatherData = await getWeatherInfo(`${location}`);
    updateWeatherInfo(
      typeof weatherData !== "string" ? weatherData : undefined
    );
  };

  const getPermission = async () => {
    const permissionStatus = await getLocationPermission();

    if (permissionStatus !== "granted") {
      getWeatherInfoForCurrentLocation("Melbourne");
      return; 
    }

    const locationData = await getCurrentLocation();
    if (typeof locationData !== "string") {
      getWeatherInfoForCurrentLocation(
        `${locationData.lat},${locationData.lng}`
      );
    }
  };
  useEffect(() => {
    getPermission();
  }, []);

  return (
    <BackgroundView>
      <WeatherInfoHeading>Weather Info</WeatherInfoHeading>
      <WeatherInfoWrapper>
        {weatherInfo ? (
          <WeatherInfoView weatherInfo={weatherInfo} />
        ) : (
          <ActivityIndicator size="large" />
        )}
      </WeatherInfoWrapper>
      <ChangeLocationViewWrapper>
        <Clickable onPress={() => navigation.navigate("ChangeLocation")}>
          <ChangeLocationText>Change location</ChangeLocationText>
        </Clickable>
      </ChangeLocationViewWrapper>
      <StatusBar style="dark" />
    </BackgroundView>
  );
};
