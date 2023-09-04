import React, { useState, useEffect } from 'react';
import { disasterForecast, getDisasterForecasts } from '../../services/disaster.forecast.service';
import { Button, Input, Table } from '../../components';
import styles from './DisasterForecast.module.scss';


export const DisasterForecast = () => {
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [prediction, setPrediction] = useState('');
  const [forecasts, setForecasts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

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

        // Reload the page after handling the prediction
        window.location.reload();
      } catch (error) {
        console.error('Error predicting disaster:', error);
      }
    }
  };

  const handleClosePopup = () => {
    // Close the popup
    setShowPopup(false);
  };

  const clearInputs = () => {
    setDate('');
    setLocation('');
    setPrediction('');
  };

  // Create an array to store the transposed data for the forecasts
  const forecastTableData = [];

  // Determine the unique attributes across all forecasts
  const allAttributes = new Set();
  forecasts.forEach((forecast) => {
    Object.keys(forecast).forEach((key) => {
      allAttributes.add(key);
    });
  });

  // Filter out the "Attribute" column
  allAttributes.delete('Attribute');

  // Add the headers as the first row
  forecastTableData.push([...allAttributes]);

  // Add forecast data as rows
  forecasts.forEach((forecast) => {
    const row = [];
    allAttributes.forEach((attribute) => {
      row.push(forecast[attribute] || '');
    });
    forecastTableData.push(row);
  });

  return (
    <div className={styles.disasterForecast}>
      <div className={styles.leftSection}>
        <div className={styles.assessForm}>
          <div className={styles.assessedHeader}>Disaster Forecast Prediction</div>
          <Input label="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          <Input type="date" label="Date" value={date} onChange={(e) => setDate(e.target.value)} />
          <Button label="Prediction" onClick={handlePredict} />
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
              </>
            )}
          </div>
        )}
        <div className={styles.forecastsList}>
          <h3>Disaster Forecasts:</h3>
          {forecastTableData.length > 0 ? (
            <Table label="All Forecasts" headers={forecastTableData[0]} data={forecastTableData.slice(1)} />
          ) : (
            <p>No disaster forecasts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisasterForecast;

