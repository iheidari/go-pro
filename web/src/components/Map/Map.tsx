import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import FullscreenButton from "./FullscreenButton";
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  if (!selectedVideo || gpsData.length === 0) {
    return null;
  }

  const handleMarkerClick = (gps: GpsData) => {
    if (videoElement) {
      videoElement.currentTime = gps.second;
    }
  };

  const fullscreenClicked = () => {
    setIsFullscreen((value) => !value);
  };

  return (
    <div
      className={isFullscreen ? "fixed top-0 left-0  h-full w-full" : ""}
      style={{ height: isFullscreen ? "100%" : "500px" }}
    >
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        tap={false}
        className={`w-full h-full`}
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
        <MapController gpsData={gpsData} fullscreen={isFullscreen} />
        <FullscreenButton
          onClick={fullscreenClicked}
          isFullscreen={isFullscreen}
        />
      </MapContainer>
    </div>
  );
};

export default Map;
