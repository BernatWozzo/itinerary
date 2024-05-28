/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { FaExternalLinkAlt } from 'react-icons/fa'; // Import the icon for links
import styles from './legend.module.scss'; // Import the SCSS module
import formatDate from '../../utils/helpers';

const Legend = ({ stops, onClickStop }) => {
  const [isVisible, setIsVisible] = useState(false); // State to toggle visibility

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
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

  const handleAnchorClick = (event) => {
    event.stopPropagation();
  };

  const onClickStopInternal = (stp) => {
    const foundIndexStop = stops.findIndex((s) => s.name === stp.name);
    setIsVisible(false);
    onClickStop(foundIndexStop);
  };

  return (
    <div className={`${styles.legendWrapper} ${isVisible ? '' : styles.hidden}`}>
      <div className={styles.legend}>
        <h2 className={styles.title}>Planning</h2>
        {Object.entries(stopsByDay).map(([date, stps]) => (
          <div key={date} className={styles.day}>
            <h3 className={styles.dayTitle}>
              {formatDate(date)}
            </h3>
            <div className={styles.stops}>
              {stps?.map((stp) => (
                <div className={styles.stop} onClick={() => onClickStopInternal(stp)}>
                  <div className={styles.hours}>
                    <p>{stp?.startHour}</p>
                    <p>{stp?.endHour}</p>
                  </div>
                  <div className={styles.separator} />
                  <div className={styles.info}>
                    <p>{stp?.name}</p>
                    <div className={styles.links}>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${stp.lat},${stp.lng}&travelmode=driving`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.directionsLink}
                        onClick={handleAnchorClick}
                      >
                        Maps
                        {' '}
                        <FaExternalLinkAlt />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
