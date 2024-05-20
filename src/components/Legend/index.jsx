import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { FaExternalLinkAlt } from 'react-icons/fa'; // Import the icon for links
import styles from './legend.module.scss'; // Import the SCSS module

const Legend = ({ stops, onClickStop }) => {
  const [isVisible, setIsVisible] = useState(true); // State to toggle visibility

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // Format date to a readable format
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    };
    return date.toLocaleDateString('es-ES', options);
  };

  // Group stops by day using useMemo to optimize performance
  const stopsByDay = useMemo(() => {
    const grouped = stops.reduce((acc, stop) => {
      const { date } = stop;
      if (!acc[date]) acc[date] = [];
      acc[date].push(stop);
      return acc;
    }, {});
    return grouped;
  }, [stops]);

  return (
    <div className={`${styles.legendWrapper} ${isVisible ? '' : styles.hidden}`}>
      <div className={styles.legend}>
        <h2 className={styles.title}>Planning</h2>
        {Object.entries(stopsByDay).map(([date, stps]) => (
          <div key={date} className={styles.day}>
            <h3 className={styles.dayTitle}>
              {formatDate(date)}
            </h3>
            <ul>
              {stps.map((stop, index) => (
                <li key={index} className={styles.stopItem}>
                  <button className={styles.stopButton} onClick={() => onClickStop(stop)} type="button">
                    {`${stop?.startHour} - ${stop?.endHour} ${stop.name}`}
                  </button>
                  <div className={styles.stopDetails}>
                    {stop.pricePerAdult > 0 && (
                    <p>
                      Precio por adulto:
                      {stop.pricePerAdult}
                      {' '}
                      €
                    </p>
                    )}
                    {stop.reservation && (
                      <p>
                        <a href={stop.reservationLink} target="_blank" rel="noopener noreferrer" className={styles.reservationLink}>
                          Reservar aquí
                          {' '}
                          <FaExternalLinkAlt />
                        </a>
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button onClick={toggleVisibility} className={styles.toggleButton} type="button">
        {isVisible ? '>' : '<'}
      </button>
    </div>
  );
};

Legend.propTypes = {
  stops: PropTypes.array.isRequired,
  onClickStop: PropTypes.func.isRequired,
};

export default Legend;
