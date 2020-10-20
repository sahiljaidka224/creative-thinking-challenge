import { FlatList, ListRenderItemInfo } from "react-native";

import { Constants } from "../../constants";
import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { SelectCity } from "./select-city";
import { getWeatherInfo } from "../../utils";
import styled from "styled-components/native";
import { useOvermind } from "../../../overmind";

type ChangeLocationProps = {
  navigation: NavigationProp<any, any>;
};

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
  { name: "Auckland", key: 4 },
];

export const ChangeLocationView: React.FC<ChangeLocationProps> = ({
  navigation,
}) => {
  const { actions } = useOvermind();
  const keyExtractor = (_item: Item, index: number) => {
    return index.toString();
  };

  const flatListRender = (renderItem: ListRenderItemInfo<Item>) => {
    const { item } = renderItem;
    const onPress = async () => {
      actions.updateWeatherInfo(undefined);

      if (navigation.canGoBack()) navigation.goBack();
      const weatherInfo = await getWeatherInfo(`${item.name}`);
      actions.updateWeatherInfo(
        typeof weatherInfo !== "string" ? weatherInfo : undefined
      );
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
    </BackgroundView>
  );
};
