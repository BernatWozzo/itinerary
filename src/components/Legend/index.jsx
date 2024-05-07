import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './legend.module.scss'; // Import the SCSS module

const Legend = ({ stops, onClickStop }) => {
  const [isVisible, setIsVisible] = useState(true); // State to toggle visibility

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // Group stops by day using useMemo to optimize performance
  const stopsByDay = useMemo(() => {
    const grouped = stops.reduce((acc, stop) => {
      const { day } = stop;
      if (!acc[day]) acc[day] = [];
      acc[day].push(stop);
      return acc;
    }, {});
    return grouped;
  }, [stops]);

  return (
    <div className={`${styles.legendWrapper} ${isVisible ? '' : styles.hidden}`}>
      <div className={styles.legend}>
        <h2 className={styles.title}>Planning</h2>
        {Object.entries(stopsByDay).map(([day, stps]) => (
          <div key={day} className={styles.day}>
            <h3 className={styles.dayTitle}>
              Día:
              { day}
            </h3>
            <ul>
              {stps.map((stop, index) => (
                <li key={index}>
                  <button className={styles.stopButton} onClick={() => onClickStop(stop)} type="button">
                    {`${stop.positionInDay}. ${stop.name}`}
                  </button>
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
