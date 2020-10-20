import { Navigator } from "./navigator";
import { Provider } from "overmind-react";
import React from "react";
import { config } from "./overmind";
import { createOvermind } from "overmind";

const overmind = createOvermind(config, {
  devtools: false,
});

export default function App() {
  return (
    <Provider value={overmind}>
      <Navigator />
    </Provider>
  );
}
