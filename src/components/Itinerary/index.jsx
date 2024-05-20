import React, { useEffect, useState } from 'react';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';

const markerColors = ['blue', 'red', 'lightgreen', 'mediumpurple', 'yellow', 'purple', 'orange'];

const Itinerary = ({ stops, setMap }) => {
  const [map, setInternalMap] = useState(null);

  useEffect(() => {
    if (map) {
      setMap(map);
      const bounds = stops?.map((stop) => [stop.lat, stop.lng]);
      map?.fitBounds(bounds);
    }
  }, [map]);

  const adjustCoordinates = (lat, lng, index) => {
    const offset = 0.0001; // Small offset value
    return [lat + index * offset, lng + index * offset];
  };

  return (
    <MapContainer center={[0, 0]} zoom={13} style={{ height: '100vh', width: '100%' }} ref={(mapRef) => setInternalMap(mapRef)}>

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stops?.map((stop, i) => {
        const adjustedPosition = adjustCoordinates(stop.lat, stop.lng, i);
        const markerIcon = L.divIcon({
          className: 'custom-icon',
          html: `<div style="background-color: ${markerColors[stop.day - 1]}; width: 10px; height: 10px; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: bold; padding: 5px; border: 3px solid white; color: white;">
                        <div>${stop.day}</div>
                    </div>`,
        });

        return (
          <Marker key={i} position={adjustedPosition} icon={markerIcon}>
            <Popup>
              <h2>{stop.name}</h2>
              <p>{stop.description}</p>
              <p>
                Tiempo:
                {' '}
                {stop.startHour}
                {' '}
                -
                {' '}
                {stop.endHour}
              </p>
              <p>
                Se necesita reserva:
                {' '}
                {stop.reservation ? 'Si' : 'No'}
              </p>
              {stop.reservation && (
              <p>
                Reserva:
                {' '}
                <a href={stop.reservationLink} target="_blank" rel="noopener noreferrer">{stop.reservationLink}</a>
              </p>
              )}
              <p>
                Precio por adulto:
                {' '}
                {stop.pricePerAdult}
                {' '}
                €
              </p>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

Itinerary.propTypes = {
  stops: PropTypes.array.isRequired,
  setMap: PropTypes.func.isRequired,
};

export default Itinerary;
