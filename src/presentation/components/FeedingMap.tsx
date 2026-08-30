import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { FeedingPoint } from '../../domain/models/FeedingPoint';

// Fix Leaflet's default icon path issue with Webpack/Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom amber icon for selected/premium feel
const catIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2Y1OWUwYiI+PHBhdGggZD0iTTEyIDJDOC4xMyAyIDUgNS4xMyA1IDljMCA1LjI1IDcgMTMgNyAxM3M3LTcuNzUgNy0xM2MwLTMuODctMy4xMy03LTctN3ptMCA5LjVjLTEuMzggMC0yLjUtMS4xMi0yLjUtMi41czEuMTItMi41IDIuNS0yLjUgMi41IDEuMTIgMi41IDIuNS0xLjEyIDIuNS0yLjUgMi41eiIvPjwvc3ZnPg==',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface FeedingMapProps {
  points: FeedingPoint[];
  selectedPointId?: string;
  onPointSelect?: (id: string) => void;
}

// Component to handle map center changes
const MapEffect: React.FC<{ points: FeedingPoint[], selectedId?: string }> = ({ points, selectedId }) => {
  const map = useMap();
  useEffect(() => {
    if (selectedId) {
      const point = points.find(p => p.id === selectedId);
      if (point?.location) {
        map.flyTo([point.location.lat, point.location.lng], 18, { animate: true });
      }
    }
  }, [selectedId, points, map]);
  return null;
};

export const FeedingMap: React.FC<FeedingMapProps> = ({ points, selectedPointId, onPointSelect }) => {
  const centerLat = -12.1215; // Parque Kennedy, Miraflores
  const centerLng = -77.0305;

  return (
    <div className="w-full h-48 rounded-3xl mb-6 overflow-hidden glass-panel border border-white/20 shadow-lg relative z-0">
      <MapContainer 
        center={[centerLat, centerLng]} 
        zoom={16} 
        zoomControl={false}
        className="w-full h-full"
      >
        {/* Usamos el mapa oficial de OpenStreetMap (100% gratis, sin API Key) 
            y le aplicamos filtros CSS para que se vea en Modo Oscuro (invert) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles-dark"
        />
        
        {points.map(point => point.location ? (
          <Marker 
            key={point.id} 
            position={[point.location.lat, point.location.lng]}
            icon={catIcon}
            eventHandlers={{
              click: () => onPointSelect && onPointSelect(point.id)
            }}
          >
            <Popup className="glass-modal">
              <div className="text-slate-900 font-bold font-sans">
                {point.sector} <br/> {point.name}
              </div>
            </Popup>
          </Marker>
        ) : null)}

        <MapEffect points={points} selectedId={selectedPointId} />
      </MapContainer>
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] z-10 rounded-3xl"></div>
    </div>
  );
};
