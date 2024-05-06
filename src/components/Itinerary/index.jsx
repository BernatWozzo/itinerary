import React from 'react';
import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const locations = [
  {
    day: 1,
    positionInDay: 1,
    name: "Recogida del coche en Madrid",
    lat: 40.451123,
    lng: -3.5971919,
    description: "Recoge tu coche en el NH Barajas",
    duration: "30 minutes"
  },
  {
    day: 1,
    positionInDay: 2,
    name: "Llegada y check-in en el hotel AF Pesquera",
    lat: 41.5936,
    lng: -4.1200,
    description: "Check-in en el hotel AF Pesquera, un elegante establecimiento vinculado al mundo del vino.",
    duration: "1 hour"
  },
  {
    day: 1,
    positionInDay: 3,
    name: "Cena en el restaurante Molino de Palacios",
    lat: 41.5917,
    lng: -4.1239,
    description: "Cena ligera en el restaurante Molino de Palacios, especializado en asados y platos locales.",
    duration: "1-2 hours"
  },
  {
    day: 2,
    positionInDay: 1,
    name: "Castillo de Peñafiel y Museo del Vino",
    lat: 41.5932,
    lng: -4.1216,
    description: "Visita al Castillo de Peñafiel y su museo dedicado al vino de la región.",
    duration: "1-2 hours"
  },
  {
    day: 2,
    positionInDay: 2,
    name: "Ruta de bodegas en bicicleta",
    lat: 41.5907,
    lng: -4.1198,
    description: "Tour en bicicleta por las bodegas cercanas, una manera activa de explorar la región vitivinícola.",
    duration: "3-4 hours"
  },
  {
    day: 2,
    positionInDay: 3,
    name: "Comida en la bodega Protos",
    lat: 41.5903,
    lng: -4.1211,
    description: "Almuerzo maridado con vinos en la bodega Protos, disfrutando de platos locales y vinos exquisitos.",
    duration: "1-2 hours"
  },
  {
    day: 2,
    positionInDay: 4,
    name: "Spa y tratamiento de vinoterapia",
    lat: 41.5936,
    lng: -4.1200,
    description: "Una tarde de relajación con tratamientos de vinoterapia en el spa del hotel AF Pesquera.",
    duration: "2-3 hours"
  },
  {
    day: 3,
    positionInDay: 1,
    name: "Parque Natural de las Hoces del Río Duratón",
    lat: 41.3000,
    lng: -3.8186,
    description: "Excursión guiada por el parque natural, ideal para senderismo o kayak.",
    duration: "3-4 hours"
  },
  {
    day: 3,
    positionInDay: 2,
    name: "Comida en El Figón de Ismael, Sepúlveda",
    lat: 41.2919,
    lng: -3.7483,
    description: "Disfruta del cochinillo asado en este conocido restaurante de Sepúlveda.",
    duration: "1-2 hours"
  },
  {
    day: 3,
    positionInDay: 3,
    name: "Visita a bodegas subterráneas en Aranda de Duero",
    lat: 41.6715,
    lng: -3.6890,
    description: "Tarde explorando las históricas bodegas subterráneas en Aranda de Duero.",
    duration: "2-3 hours"
  },
  {
    day: 4,
    positionInDay: 1,
    name: "Mercado de Peñafiel",
    lat: 41.5929,
    lng: -4.1207,
    description: "Visita rápida al mercado local para comprar productos típicos antes de partir.",
    duration: "1 hour"
  },
  {
    day: 4,
    positionInDay: 2,
    name:

      "Comida en Asador Matimore, Riaza",
    lat: 41.2790,
    lng: -3.4880,
    description: "Almuerzo en Asador Matimore, famoso por sus carnes a la parrilla, en el camino de regreso a Madrid.",
    duration: "1-2 hours"
  },
  {
    day: 4,
    positionInDay: 3,
    name: "Devolución del coche y traslado al aeropuerto de Madrid",
    lat: 40.4918,
    lng: -3.5695,
    description: "Devolución del coche en el aeropuerto de Madrid y preparativos para el vuelo de regreso a Mallorca.",
    duration: "1 hour"
  }
];

const hotel = {
  lat: 40.4918,
  lng: -3.5695
};

const markerColors = ['blue', 'red', 'lightgreen', 'mediumpurple', 'yellow', 'purple', 'organge'];  // You can change these colors as you need

const Itinerary = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef?.current) {
      const bounds = locations.map(location => [location.lat, location.lng]);
      bounds.push([hotel.lat, hotel.lng]);  // Add the hotel to the bounds
      mapRef.current.fitBounds(bounds);
    }
  }, [mapRef.current]);

  return (
    <MapContainer center={[0, 0]} zoom={13} style={{ height: "100vh", width: "100%" }} ref={mapRef}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations?.map((location, i) => {
        const markerIcon = L.divIcon({
          className: 'custom-icon',
          html: `<div style="background-color: ${markerColors[location.day - 1]}; width: 25px; height: 25px; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: bold; padding: 5px; border: 3px solid white; color: white;">
                        <div>${location.day}:${location.positionInDay}</div>
                    </div>`
        });

        return (
          <Marker key={i} position={[location.lat, location.lng]} icon={markerIcon}>
            <Popup>
              <h2>{location.name}</h2>
              <p>{location.description}</p>
              <p>Day: {location.day}</p>
              <p>Position in day: {location.positionInDay}</p>
              <p>Duration: {location.duration}</p>
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
                        </div>`
          })}>
          <Popup>
            <h2>{hotel.name}</h2>
            <p>{hotel.description}</p>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default Itinerary;
