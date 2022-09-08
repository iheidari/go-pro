import { Circle } from "react-leaflet";
import { GpsData } from "./type";

interface MarkersProps {
  onClick?: (gpsData: GpsData) => void;
  gpsData: GpsData[];
  currentFrame: number;
}

const Markers = ({ onClick, gpsData, currentFrame }: MarkersProps) => {
  const markers = gpsData.map((marker) => (
    <Circle
      key={marker.second}
      center={marker}
      pathOptions={{
        color: "black",
      }}
      radius={5}
      eventHandlers={{ click: onClick && (() => onClick(marker)) }}
    />
  ));
  if (gpsData[currentFrame]) {
    markers.push(
      <Circle
        key={-1}
        center={gpsData[currentFrame]}
        pathOptions={{
          color: "yellow",
        }}
        radius={10}
      />
    );
  }
  return <>{markers}</>;
};

export default Markers;
