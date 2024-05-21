import React, { useEffect, useRef, useState } from 'react';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
import formatDate from '../../utils/helpers';

const markerColors = ['blue', 'red', 'lightgreen', 'mediumpurple', 'yellow', 'purple', 'orange'];

const Itinerary = ({ stops, selectedStopIndex }) => {
  const [map, setInternalMap] = useState(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (map) {
      const bounds = stops?.map((stop) => [stop.lat, stop.lng]);
      map?.fitBounds(bounds);
    }
  }, [map]);

  useEffect(() => {
    if (selectedStopIndex !== null && markersRef.current[selectedStopIndex]) {
      const marker = markersRef.current[selectedStopIndex];
      map.setView(marker.getLatLng(), 15, {
        animate: true, // Enable animation
        duration: 1.0, // Animation duration in seconds
        easeLinearity: 0.5, // Linear motion easing for the animation
      });
      setTimeout(() => {
        marker.openPopup();
      }, 1000); // Adjust the timeout to match the duration of the animation
    }
  }, [selectedStopIndex, map]);

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
          html: `<div style="background-color: ${markerColors[Math.floor(Math.random() * markerColors.length)]}; width: 10px; height: 10px; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: bold; padding: 5px; border: 3px solid white; color: white;">
                    </div>`,
        });

        return (
          <Marker
            key={i}
            position={adjustedPosition}
            icon={markerIcon}
            ref={(el) => markersRef.current[i] = el}
          >
            <Popup>
              <h2>{stop.name}</h2>
              <p>{stop.description}</p>
              <p>{formatDate(stop.date)}</p>
              <p>
                Tiempo:
                {' '}
                {stop.startHour}
                {' '}
                -
                {' '}
                {stop.endHour}
              </p>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

Itinerary.defaultProps = {
  selectedStopIndex: null,
};
Itinerary.propTypes = {
  stops: PropTypes.array.isRequired,
  selectedStopIndex: PropTypes.number,
};

export default Itinerary;
