import React, { useEffect, useState } from 'react';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';

const hotel = {
  lat: 40.4918,
  lng: -3.5695,
};

const markerColors = ['blue', 'red', 'lightgreen', 'mediumpurple', 'yellow', 'purple', 'organge']; // You can change these colors as you need

const Itinerary = ({ stops, setMap }) => {
  const [map, setInternalMap] = useState(null);

  useEffect(() => {
    if (map) {
      setMap(map);
      const bounds = stops?.map((location) => [location.lat, location.lng]);
      bounds.push([hotel.lat, hotel.lng]); // Add the hotel to the bounds
      map?.fitBounds(bounds);
    }
  }, [map]);

  return (
    <MapContainer center={[0, 0]} zoom={13} style={{ height: '100vh', width: '100%' }} ref={(mapRef) => setInternalMap(mapRef)}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stops?.map((location, i) => {
        const markerIcon = L.divIcon({
          className: 'custom-icon',
          html: `<div style="background-color: ${markerColors[location.day - 1]}; width: 25px; height: 25px; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: bold; padding: 5px; border: 3px solid white; color: white;">
                        <div>${location.day}:${location.positionInDay}</div>
                    </div>`,
        });

        return (
          <Marker key={i} position={[location.lat, location.lng]} icon={markerIcon}>
            <Popup>
              <h2>{location.name}</h2>
              <p>{location.description}</p>
              <p>
                Day:
                {location.day}
              </p>
              <p>
                Position in day:
                {location.positionInDay}
              </p>
              <p>
                Duration:
                {location.duration}
              </p>
            </Popup>
          </Marker>
        );
      })}

      {/* Add the hotel marker */}
      {hotel && (
        <Marker
          position={[hotel.lat, hotel.lng]}
          icon={L.divIcon({
            className: 'hotel-icon',
            html: `<div style="background-color: #123456; width: 25px; height: 25px; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: bold; padding: 5px; border: 3px solid white; color: white;">
                            <div>H</div>
                        </div>`,
          })}
        >
          <Popup>
            <h2>{hotel.name}</h2>
            <p>{hotel.description}</p>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

Itinerary.propTypes = {
  stops: PropTypes.array.isRequired,
  setMap: PropTypes.func.isRequired,
};

export default Itinerary;
