import React, { useEffect, useState } from "react";
import { getCurrentLocation, getWeatherInfo } from "./utils";

import { ActivityIndicator } from "react-native";
import { Constants } from "./constants";
import { NavigationProp } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { WeatherInfo } from "./types";
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

const ChangeLocationView = styled.TouchableOpacity`
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
  const [weatherInfo, updateWeatherInfo] = useState<WeatherInfo | undefined>(
    undefined
  );
  const getWeatherInfoForCurrentLocation = async () => {
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
    getWeatherInfoForCurrentLocation();
  }, []);

  return (
    <BackgroundView>
      <WeatherInfoHeading>Weather Info</WeatherInfoHeading>
      {weatherInfo ? (
        <WeatherInfoWrapper>
          <WeatherInfoView weatherInfo={weatherInfo} />
        </WeatherInfoWrapper>
      ) : (
        <ActivityIndicator size="large" />
      )}
      <ChangeLocationViewWrapper>
        <ChangeLocationView
          onPress={() => navigation.navigate("ChangeLocation")}
        >
          <ChangeLocationText>Change location</ChangeLocationText>
        </ChangeLocationView>
      </ChangeLocationViewWrapper>
      <StatusBar style="auto" />
    </BackgroundView>
  );
};
