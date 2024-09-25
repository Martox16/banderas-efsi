"use client";

import React from 'react';
import styles from './Points.module.css';

const Points = ({ score }) => {
  return (
    <div className={styles.container}>
      <h2>Puntos: {score}</h2>
    </div>
  );
};

export default Points;
