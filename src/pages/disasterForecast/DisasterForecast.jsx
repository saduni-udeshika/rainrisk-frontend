import { Button, Input } from '../../components';
import styles from './DisasterForecast.scss';
import { disasterForecast, getDisasterForecasts } from '../../services/disaster.forecast.service';
import React, { useState, useEffect } from 'react';

export const DisasterForecast = () => {
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [prediction, setPrediction] = useState('');
  const [forecasts, setForecasts] = useState([]);

  useEffect(() => {
    fetchForecasts();
  }, []);

  const fetchForecasts = async () => {
    try {
      const response = await getDisasterForecasts();
      setForecasts(response.data);
    } catch (error) {
      console.error('Error fetching disaster forecasts:', error);
    }
  };

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
          <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          <input type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
          <button onClick={handlePredict}>Prediction</button>
        </div>
        {prediction && (
          <div className={styles.predictionResult}>
            <h3>Prediction Result:</h3>
            <p>Disaster Occurrence: {prediction['Disaster Occurrence']}</p>
            <p>Disaster Date: {prediction['Disaster Date']}</p>
            <p>Humidity Day (%): {prediction['Humidity Day (%)']}</p>
            <p>Rainfalls (mm): {prediction['Rainfalls (mm)']}</p>
            <p>Temperature Max (°C): {prediction['Temperature Max (°C)']}</p>
            <p>Wind Speed (km/h): {prediction['Wind Speed (km/h)']}</p>
            {prediction['Disaster Occurrence'] === 'Yes' && (
              <>
                <p>Disaster Type: {prediction['Disaster Type']}</p>
                <p>Severity: {prediction['Severity']}</p>
                <p>Nearest Shelter Distance (km): {prediction['Nearest Shelter_km']}</p>
                {/* Display Additional Information */}
              </>
            )}
          </div>
        )}
        <div className={styles.forecastsList}>
          <h3>Disaster Forecasts:</h3>
          {forecasts.length > 0 ? (
            <ul>
              {forecasts.map((forecast, index) => (
                <li key={index}>
                  <p>Location: {forecast.Location}</p>
                  <p>Disaster Occurrence: {forecast['Disaster Occurrence']}</p>
                  <p>Disaster Date: {forecast['Disaster Date']}</p>
                  <p>Humidity Day (%): {forecast['Humidity Day (%)']}</p>
                  <p>Rainfalls (mm): {forecast['Rainfalls (mm)']}</p>
                  <p>Temperature Max (°C): {forecast['Temperature Max (°C)']}</p>
                  <p>Wind Speed (km/h): {forecast['Wind Speed (km/h)']}</p>
                  {forecast['Disaster Occurrence'] === 'Yes' && (
                    <>
                      <p>Disaster Type: {forecast['Disaster Type']}</p>
                      <p>Severity: {forecast['Severity']}</p>
                      <p>Nearest Shelter Distance (km): {forecast['Nearest Shelter_km']}</p>
                      {/* Display Additional Information */}
                    </>
                  )}
                  <hr />
                </li>
              ))}
            </ul>
          ) : (
            <p>No disaster forecasts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisasterForecast;




