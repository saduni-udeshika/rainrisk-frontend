import React, { useState } from 'react';
import { Button, Input } from '../../components';
import styles from './DisasterForecast.scss';
import { disasterForecast } from '../../services/disaster.forecast.service';

export const DisasterForecast = () => {
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [prediction, setPrediction] = useState('');

  const handlePredict = async () => {
    if (location && date) {
      try {
        const response = await disasterForecast(location, date);
        setPrediction(response.data);

        // Clear the input fields after successful prediction
        clearInputs();
      } catch (error) {
        console.error('Error predicting disaster:', error);
      }
    }
  };

  const clearInputs = () => {
    setDate('');
    setLocation('');
    setPrediction('');
  };

  return (
    <div className={styles.disasterForecast}>
      <div className={styles.leftSection}>
        <div className={styles.assessForm}>
          <div className={styles.assessedHeader}>Disaster Forecast Prediction</div>
          <Input type="location" label="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          <Input type="date" label="Date" value={date} onChange={(e) => setDate(e.target.value)} />
          <Button label="Prediction" expand onClick={handlePredict} />
        </div>
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
    </div>
  );
};

export default DisasterForecast;



