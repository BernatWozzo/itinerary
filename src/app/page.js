"use client"
import React from "react";
import styles from "./page.module.scss";
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';

const Itinerary = dynamic(() => import('../components/Itinerary'), { ssr: false });

export default function Home() {
  return (
    <main className={styles.main}>
      <Itinerary/>
    </main>
  );
}
