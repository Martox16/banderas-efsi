"use client";

import React, { useState } from 'react';
import styles from './CountryName.module.css';

const CountryName = ({ selectedCountry, onGuess }) => {
  const [guess, setGuess] = useState('');

  const handleGuess = (e) => {
    e.preventDefault();
    onGuess(guess);
    setGuess('');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleGuess}>
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Escribe el nombre del país"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Adivinar</button>
      </form>
    </div>
  );
};

export default CountryName;
