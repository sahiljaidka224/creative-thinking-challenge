import React from "react";
import styled from "styled-components/native";

type SelectCityProps = {
  name: string;
  onPress: () => void;
};

const Wrapper = styled.View`
  width: auto;
  height: auto;
  border-radius: 10px;
  margin: 10px 20px;
  border: 1px solid #618094;
`;

const CityName = styled.Button`
  width: auto;
  height: auto;
`;

export const SelectCity: React.FC<SelectCityProps> = ({ name, onPress }) => {
  return (
    <Wrapper>
      <CityName title={name} onPress={onPress} />
    </Wrapper>
  );
};
