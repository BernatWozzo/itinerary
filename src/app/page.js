'use client';

import dynamic from 'next/dynamic';

import React, { useState } from 'react';
import styles from './page.module.scss';
import 'leaflet/dist/leaflet.css';
import Legend from '../components/Legend';
import stops from '../utils/stops';

const Itinerary = dynamic(() => import('../components/Itinerary'), { ssr: false });

const Home = () => {
  const [map, setMap] = useState(null);
  const onClickStop = (stop) => {
    if (map) {
      map.setView([stop.lat, stop.lng], 17, {
        animate: true, // Enable animation
        duration: 2.0, // Animation duration in seconds
        easeLinearity: 0.5, // Linear motion easing for the animation
      });
    }
  };
  return (
    <main className={styles.main}>
      <Legend stops={stops} onClickStop={onClickStop} />
      <Itinerary stops={stops} setMap={setMap} />
    </main>
  );
};

export default Home;
