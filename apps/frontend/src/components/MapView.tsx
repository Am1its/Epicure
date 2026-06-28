'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useRouter } from 'next/navigation';
import type { Restaurant } from '@org/shared-types';
import { TEXT } from '../lib/text';

interface MapViewProps {
  restaurants: Restaurant[];
  userCoords?: { lat: number; lng: number };
}

const DEFAULT_CENTER: [number, number] = [32.0853, 34.7818]; // Tel Aviv

function makeLabelIcon(name: string) {
  return L.divIcon({
    className: '',
    html: `<div class="epicure-map-label">
      <span class="epicure-map-label__text">${name}</span>
      <div class="epicure-map-label__tail"></div>
    </div>`,
    iconAnchor: [0, 0],
  });
}

function makeUserIcon() {
  return L.divIcon({
    className: '',
    html: '<div class="epicure-map-user-marker"></div>',
    iconAnchor: [12, 12],
    iconSize: [24, 24],
  });
}

function RecenterButton({ userCoords }: { userCoords: { lat: number; lng: number } }) {
  const map = useMap();
  return (
    <button
      className="epicure-map__recenter-btn"
      aria-label={TEXT.map.recenterAriaLabel}
      onClick={() => map.flyTo([userCoords.lat, userCoords.lng], map.getZoom())}
    />
  );
}

export function MapView({ restaurants, userCoords }: MapViewProps) {
  const router = useRouter();
  const mapped = restaurants.filter(r => r.latitude != null && r.longitude != null);

  const center: [number, number] =
    userCoords
      ? [userCoords.lat, userCoords.lng]
      : mapped.length > 0
        ? [mapped[0].latitude!, mapped[0].longitude!]
        : DEFAULT_CENTER;

  return (
    <div className="epicure-map-container">
      <MapContainer center={center} zoom={14} className="epicure-map">
        <TileLayer
          url={`https://api.maptiler.com/maps/dataviz/256/{z}/{x}/{y}.png?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`}
          attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          tileSize={256}
        />
        {mapped.map(r => (
          <Marker
            key={r.id}
            position={[r.latitude!, r.longitude!]}
            icon={makeLabelIcon(r.name)}
            eventHandlers={{ click: () => router.push(`/restaurants/${r.id}`) }}
          />
        ))}
        {userCoords && (
          <Marker
            position={[userCoords.lat, userCoords.lng]}
            icon={makeUserIcon()}
          />
        )}
        {userCoords && <RecenterButton userCoords={userCoords} />}
      </MapContainer>
    </div>
  );
}
