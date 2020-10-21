import * as Location from "expo-location";

import { Constants } from "../constants";
import { LocationAccuracy } from "expo-location";
import { Point } from "../@types";
import { getLocationPermission } from "./get-location-permission";

export const getCurrentLocation = async (): Promise<Point | string> => {
  try {
    const locationData = await Location.getCurrentPositionAsync({
      accuracy: LocationAccuracy.Highest,
    });

    return {
      lat: locationData.coords.latitude,
      lng: locationData.coords.longitude,
    };
  } catch (err) {
    return Constants.NETWORK_ERROR;
  }
};
