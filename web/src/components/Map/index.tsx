import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
// import { useMap } from "react-leaflet/hooks";

const position = { lat: 51.505, lng: -0.09 };
interface MapProps {
  selectedVideo?: string;
}
const Map = ({ selectedVideo }: MapProps) => {
  if (!selectedVideo) {
    return null;
  }
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
      <Marker position={position}></Marker>
    </MapContainer>
  );
};

export default Map;
