"use client";

import React from 'react';
import styles from './Flag.module.css';

const Flag = ({ flagUrl, countryName }) => {
  return (
    <div className={styles.container}>
      <img src={flagUrl} alt={`Flag of ${countryName}`} className={styles.image} />
    </div>
  );
};

export default Flag;
