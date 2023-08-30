import React, { useState } from 'react';
import axios from 'axios';
import styles from './DisasterForecast.module.scss';

const DisasterForecast = () => {
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [prediction, setPrediction] = useState('');

  const handlePredict = async () => {
    try {
      const response = await axios.post('/predict-disaster', {
        date,
        location,
      });
      setPrediction(response.data);
    } catch (error) {
      console.error('Error predicting disaster:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Disaster Forecast Prediction</h2>
      <div className={styles.inputGroup}>
        <label>Date: </label>
        <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className={styles.inputGroup}>
        <label>Location: </label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>
      <button className={styles.predictButton} onClick={handlePredict}>
        Predict Disaster
      </button>
      {prediction && (
        <div className={styles.predictionResult}>
          <h3>Prediction Result:</h3>
          <p>Disaster Occurrence: {prediction['Disaster Occurrence']}</p>
          {prediction['Disaster Occurrence'] === 'Yes' && (
            <>
              <p>Disaster Type: {prediction['Disaster Type']}</p>
              <p>Severity: {prediction['Severity']}</p>
              <p>Nearest Shelter Distance (km): {prediction['Nearest Shelter_km']}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DisasterForecast;
