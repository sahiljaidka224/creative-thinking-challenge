import { ActivityIndicator, FlatList, ListRenderItemInfo } from "react-native";
import React, { useState } from "react";

import { Constants } from "../../constants";
import { SelectCity } from "./select-city";
import { WeatherInfo } from "../../@types";
import { WeatherInfoView } from "../weather-info-view";
import { getWeatherInfo } from "../../utils";
import styled from "styled-components/native";

const BackgroundView = styled.SafeAreaView`
  flex: 1;
  background-color: ${Constants.COLOR.backgroundColor};
`;

type Item = {
  name: string;
  key: number;
};

const flatListData = [
  { name: "London", key: 1 },
  { name: "New Delhi", key: 2 },
  { name: "New York", key: 3 },
];

export const ChangeLocationView = () => {
  const [weatherInfo, updateWeatherInfo] = useState<WeatherInfo>();
  const [loading, updateLoading] = useState<boolean>(false);

  const keyExtractor = (_item: Item, index: number) => {
    return index.toString();
  };

  const flatListRender = (renderItem: ListRenderItemInfo<Item>) => {
    const { item } = renderItem;
    const onPress = async () => {
      updateLoading(true);
      const weatherInfo = await getWeatherInfo(`${item.name}`);
      updateWeatherInfo(
        typeof weatherInfo !== "string" ? weatherInfo : undefined
      );
      updateLoading(false);
    };
    return <SelectCity name={item.name} onPress={onPress} />;
  };
  return (
    <BackgroundView>
      <FlatList
        data={flatListData}
        keyExtractor={keyExtractor}
        renderItem={flatListRender}
      />
      {loading && <ActivityIndicator size="large" />}
      {weatherInfo && <WeatherInfoView weatherInfo={weatherInfo} />}
    </BackgroundView>
  );
};
