"use client"
import React from "react";
import styles from "./page.module.scss";
import Itinerary from '../components/Itinerary';
import 'leaflet/dist/leaflet.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Itinerary/>
    </main>
  );
}
