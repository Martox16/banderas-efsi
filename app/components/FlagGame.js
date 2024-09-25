"use client";

import React, { useEffect, useState } from 'react';
import Flag from './Flag';
import CountryName from './CountryName';
import Points from './Points';
import styles from './FlagGame.module.css';

const FlagGame = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15); // Inicializa el temporizador en 15 segundos

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/flag/images');
        const data = await response.json();
        setCountries(data.data);
        selectRandomCountry(data.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const selectRandomCountry = (countriesList) => {
    const randomIndex = Math.floor(Math.random() * countriesList.length);
    setSelectedCountry(countriesList[randomIndex]);
    setTimeLeft(15); // Reinicia el temporizador al seleccionar una nueva bandera
  };

  const handleCorrectGuess = () => {
    setScore(prevScore => prevScore + 10);
    selectRandomCountry(countries);
  };

  const handleIncorrectGuess = () => {
    setScore(prevScore => prevScore - 1);
    selectRandomCountry(countries);
  };

  const handleGuess = (guess) => {
    if (guess.toLowerCase() === selectedCountry.name.toLowerCase()) {
      handleCorrectGuess();
    } else {
      handleIncorrectGuess();
    }
  };

  // Temporizador
  useEffect(() => {
    if (timeLeft === 0) {
      handleIncorrectGuess(); // Cambia de bandera y resta un punto si el tiempo se acaba
    }

    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(prevTime => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(timer); // Limpia el temporizador al desmontar el componente
  }, [timeLeft]);

  if (!selectedCountry) {
    return <p>Cargando...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Adivina la Bandera</h1>
      <Points score={score} />
      <h2>Tiempo restante: {timeLeft} segundos</h2> {/* Muestra el temporizador */}
      <Flag flagUrl={selectedCountry.flag} countryName={selectedCountry.name} />
      <CountryName selectedCountry={selectedCountry} onGuess={handleGuess} />
    </div>
  );
};

export default FlagGame;
