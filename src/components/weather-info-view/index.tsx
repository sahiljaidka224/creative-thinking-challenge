import React from "react";
import { WeatherInfo } from "../../types";
import styled from "styled-components/native";

type WeatherInfoViewProps = {
  weatherInfo: WeatherInfo;
};

const BackgroundView = styled.View`
  width: 100%;
  min-height: 30%;
  height: auto;
  background-color: transparent;
  padding: 20px;
`;

const Container = styled.View`
  width: 100%;
  height: auto;
  border-radius: 25px;
  border: 1.5px solid #618094;
  padding: 10px 20px;
  display: flex;
`;

const LocationTextWrapper = styled.View`
  display: flex;
  align-items: center;
`;

const CommonText = styled.Text<{ fontSize?: string }>`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "15px")};
  align-items: center;
`;

const BottomWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ImageWrapper = styled.View`
  width: auto;
  margin-top: 10px;
  padding-top: 10px;
  justify-content: center;
  align-items: center;
  max-width: 40%;
`;

const ImageView = styled.Image`
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
`;

const DataWrapper = styled.View`
  display: flex;
  justify-content: center;
`;

export const WeatherInfoView: React.FC<WeatherInfoViewProps> = ({
  weatherInfo,
}) => {
  const {
    location,
    weatherIcons,
    weatherDescription,
    temperature,
    windSpeed,
    uvIndex,
    visibility,
  } = weatherInfo;
  const { city, country, region } = location;

  const imageUri = weatherIcons.length > 0 ? weatherIcons[0] : "";
  const weatherDesc =
    weatherDescription.length > 0 ? weatherDescription[0] : "";
  return (
    <BackgroundView>
      <Container>
        <LocationTextWrapper>
          <CommonText fontSize="17px">{`${city}, ${region}, ${country}`}</CommonText>
        </LocationTextWrapper>
        <BottomWrapper>
          <ImageWrapper>
            <ImageView
              source={{ uri: imageUri, cache: "default" }}
              resizeMode="contain"
            />
            <CommonText fontSize="16px">{weatherDesc}</CommonText>
          </ImageWrapper>
          <CommonText fontSize="24px">{`${temperature} ˚C`}</CommonText>
          <DataWrapper>
            <CommonText>{`Wind: ${windSpeed} kmph`}</CommonText>
            <CommonText>{`UV Index: ${uvIndex}`}</CommonText>
            <CommonText>{`Visibility: ${visibility} km`}</CommonText>
          </DataWrapper>
        </BottomWrapper>
      </Container>
    </BackgroundView>
  );
};
