                                                                                                                                                     

import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useTranslation } from "react-i18next";
import { MapPin, Search, Layers } from "lucide-react";
import L from "leaflet";

// Fix marker icon issue in Leaflet with React
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

const locations = [
  { name: "Aïn Harrouda", coordinates: { lat: 33.6400, lng: -7.4648 }, address: "Adresse d'Aïn Harrouda" },
  { name: "Mohammedia", coordinates: { lat: 33.6864, lng: -7.4120 }, address: "Adresse de Mohammedia" },
  { name: "Ech-Chellalate", coordinates: { lat: 33.6129, lng: -7.5148 }, address: "Adresse d'Ech-Chellalate" },
  { name: "Béni Yakhlef", coordinates: { lat: 33.6802, lng: -7.3712 }, address: "Adresse de Béni Yakhlef" },
];

const getBoundingCoordinates = (locations: { lat: number; lng: number }[]) => {
  const latitudes = locations.map((loc) => loc.lat);
  const longitudes = locations.map((loc) => loc.lng);

  const validLatitudes = latitudes.filter((lat) => !isNaN(lat));
  const validLongitudes = longitudes.filter((lng) => !isNaN(lng));

  if (validLatitudes.length === 0 || validLongitudes.length === 0) {
    console.error("Invalid latitude or longitude values");
    return [];
  }

  const minLat = Math.min(...validLatitudes);
  const maxLat = Math.max(...validLatitudes);
  const minLng = Math.min(...validLongitudes);
  const maxLng = Math.max(...validLongitudes);

  return [
    [minLat, minLng],
    [maxLat, minLng],
    [maxLat, maxLng],
    [minLat, maxLng],
  ];
};

const polygonCoordinates = getBoundingCoordinates(locations);

export const Map: React.FC = () => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState<string>("");

  const mapRef = useRef<MapContainer | null>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="relative h-[calc(100vh-4rem)]">
      
      {/* Barre de recherche avec un z-index élevé */}
      <div className="absolute top-4 right-4 z-[999] w-96 bg-white rounded-lg shadow-lg p-4">
        <div className="relative mb-4">
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن موقع..."
            value={searchText}
            onChange={handleSearch}
            className="w-full pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">تصفية حسب النوع</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded text-emerald-600" />
              <span>المرافق الإدارية</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded text-emerald-600" />
              <span>المرافق الصحية</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded text-emerald-600" />
              <span>المرافق التعليمية</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded text-emerald-600" />
              <span>المرافق الثقافية</span>
            </label>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2">المواقع القريبة</h3>
          <div className="space-y-3">
            {locations.map((location) => (
              <div key={location.name} className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-emerald-600 mt-1" />
                <div>
                  <h4 className="font-medium">{location.name}</h4>
                  <p className="text-sm text-gray-500">{location.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 z-[999]">
        <button className="bg-white p-2 rounded-lg shadow-lg">
          <Layers className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Carte avec positionnement et z-index ajusté */}
      <MapContainer
        center={[33.65, -7.45]}
        zoom={11}
        style={{ width: "100%", height: "100%" }}
        ref={mapRef}
        className="z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {polygonCoordinates.length > 0 && (
          <Polygon
            positions={polygonCoordinates}
            color="blue"
            weight={3}
            fillOpacity={0.2}
          />
        )}

        {locations.map((location) => (
          <Marker
            key={location.name}
            position={location.coordinates}
            icon={customIcon}
          >
            <Popup>
              <h4>{location.name}</h4>
              <p>{location.address}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};