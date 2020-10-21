import { ChangeLocationView } from ".";
import React from "react";
import { SelectCity } from "./select-city";
import renderer from "react-test-renderer";

describe("Select City tests", () => {
  it("renders successfully with empty city name", () => {
    const rendered = renderer
      .create(<SelectCity name="" onPress={() => jest.fn()} />)
      .toJSON();
    expect(rendered).toBeTruthy();
  });

  it("checking if all the children renders", () => {
    const onPressMock = jest.fn();
    const rendered = renderer
      .create(<SelectCity name="Perth" onPress={onPressMock} />)
      .toJSON();
    if (rendered !== null && !Array.isArray(rendered)) {
      expect(rendered.children?.length).toBe(1);
    }
  });

  it("renders change location view", () => {
    const rendered = renderer.create(<ChangeLocationView />).toJSON();
    if (rendered !== null && !Array.isArray(rendered)) {
      expect(rendered.type).toBe("RCTSafeAreaView");
    }
  });
});
