import { GpsData } from "./type";

export const getMapCenter = (gpsData: GpsData[]) => {
  const boundry = gpsData.reduce(
    (acc, data, index) => {
      if (index === 0) {
        acc.minLat = data.lat;
        acc.maxLat = data.lat;
        acc.minLng = data.lng;
        acc.maxLng = data.lng;
        return acc;
      }
      if (acc.minLat > data.lat) {
        acc.minLat = data.lat;
      }
      if (acc.minLng > data.lng) {
        acc.minLng = data.lng;
      }
      if (acc.maxLat < data.lat) {
        acc.maxLat = data.lat;
      }
      if (acc.maxLng < data.lng) {
        acc.maxLng = data.lng;
      }
      return acc;
    },
    { minLat: 0, maxLat: 0, minLng: 0, maxLng: 0 }
  );
  const center = {
    lat: (boundry.minLat + boundry.maxLat) / 2,
    lng: (boundry.minLng + boundry.maxLng) / 2,
  };
  return { boundry, center };
};
