import * as Location from "expo-location";

import { LocationAccuracy } from "expo-location";
import { Point } from "../types";

export const getCurrentLocation = async (): Promise<Point | string> => {
  try {
    const { status: existingStatus } = await Location.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Location.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      return "Please allow location permissions from settings in order to take full advantage of the app.";
    }

    const locationData = await Location.getCurrentPositionAsync({
      accuracy: LocationAccuracy.Highest,
    });

    return {
      lat: locationData.coords.latitude,
      lng: locationData.coords.longitude,
    };
  } catch (err) {
    return "Please try again!";
  }
};
