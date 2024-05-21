'use client';

import dynamic from 'next/dynamic';

import React, { useState } from 'react';
import styles from './page.module.scss';
import 'leaflet/dist/leaflet.css';
import Legend from '../components/Legend';
import stops from '../utils/stops';

const Itinerary = dynamic(() => import('../components/Itinerary'), { ssr: false });

const Home = () => {
  const [selectedStopIndex, setSelectedStopIndex] = useState(null);
  return (
    <main className={styles.main}>
      <Legend stops={stops} onClickStop={setSelectedStopIndex} />
      <Itinerary stops={stops} selectedStopIndex={selectedStopIndex} />
    </main>
  );
};

export default Home;
