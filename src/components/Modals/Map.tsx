import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";

interface MapComponentProps {
  position: LatLngExpression; // Use LatLngExpression for type safety
}

const MapComponent: React.FC<MapComponentProps> = ({ position }) => {
  return (
    <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={position}>
        <Popup>Driver's Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
