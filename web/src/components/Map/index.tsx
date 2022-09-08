import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import MapController from "./MapController";
import Markers from "./Markers";
import { GpsData } from "./type";

const position = { lat: 51.505, lng: -0.09 };
interface MapProps {
  selectedVideo?: string;
  gpsData: GpsData[];
  videoElement: HTMLVideoElement | null;
  currentFrame: number;
}

const Map = ({
  selectedVideo,
  gpsData,
  videoElement,
  currentFrame,
}: MapProps) => {
  if (!selectedVideo || gpsData.length === 0) {
    return null;
  }

  const handleMarkerClick = (gps: GpsData) => {
    if (videoElement) {
      videoElement.currentTime = gps.second;
    }
  };

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      tap={false}
      style={{ width: "100%", height: "500px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Markers
        gpsData={gpsData}
        onClick={handleMarkerClick}
        currentFrame={currentFrame}
      />
      <MapController gpsData={gpsData} />
    </MapContainer>
  );
};

export default Map;
