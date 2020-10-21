import * as Location from "expo-location";

export const getLocationPermission = async (): Promise<string> => {
  const { status: existingStatus } = await Location.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Location.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus;
};
