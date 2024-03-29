import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { GpsData } from "./type";
import { getMapCenter } from "./util";

interface MapControllerProps {
  fullscreen: boolean;
  gpsData: GpsData[];
}

const MapController = ({ gpsData, fullscreen }: MapControllerProps) => {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
    if (gpsData.length > 0) {
      const { boundry, center } = getMapCenter(gpsData);
      map.setView(center);
      const zoom = map.getBoundsZoom([
        [boundry.minLat, boundry.minLng],
        [boundry.maxLat, boundry.maxLng],
      ]);
      map.setZoom(zoom);
    }
  }, [map, gpsData, fullscreen]);
  return null;
};

export default MapController;
