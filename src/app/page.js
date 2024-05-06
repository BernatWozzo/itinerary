'use client';

import dynamic from 'next/dynamic';

import React from 'react';
import styles from './page.module.scss';
import 'leaflet/dist/leaflet.css';

const Itinerary = dynamic(() => import('../components/Itinerary'), { ssr: false });

export default function Home() {
  return (
    <main className={styles.main}>
      <Itinerary />
    </main>
  );
}
