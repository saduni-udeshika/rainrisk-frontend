import React, { useEffect, useState } from 'react';
import { Button, ImagePicker, Input, Progress, Select } from '../../components';
import { useQuery } from '../../hooks';
import { getImageFromFile } from '../../utils';
import { calculateEnvironmentalDamagePercentage, getEnvironmentalDamagePercentage } from '../../services/environmental.assessment.service';
import moment from 'moment/moment';
import styles from './EnvironmentalFloodDamage.module.scss';

export const EnvironmentalFloodDamage = () => {
  const [image, setImage] = useState();
  const [selectedDisasterType, setSelectedDisasterType] = useState('flood');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const { isLoading: isAssessDamageLoading, call: callEnvironmentalDamage } = useQuery(calculateEnvironmentalDamagePercentage);
  const {
    isLoading: isLoadingAssessed,
    call: callGetEnvironmentalDamagePercentage,
    response: assessedResponse,
  } = useQuery(getEnvironmentalDamagePercentage);
  const [responsePercentage, setResponsePercentage] = useState();

  const handleDisasterTypeChange = (e) => {
    setSelectedDisasterType(e.target.value);
  };

  useEffect(() => {
    callGetEnvironmentalDamagePercentage();
  }, []);

  const disasterOptions = [
    { value: 'flood', text: 'Flood' },
    { value: 'landslide', text: 'Landslide' },
    { value: 'drought', text: 'Drought' },
    { value: 'f1ood', text: 'F1ood' },
    { value: 'coastal-erosion', text: 'Coastal-Erosion' },
  ];

  const onSelectImage = async (e) => {
    if (e.target.files === null || e.target.files.length === 0) return;
    const visibleUrl = await getImageFromFile(e.target.files[0]);
    setImage({
      data: visibleUrl,
      file: e.target.files[0],
    });
  };

  const resetInputs = () => {
    setImage(undefined);
    setSelectedDisasterType('flood');
    setLocation('');
    setDate('');
  };

  const handleEnvironmentalDamage = async () => {
    if (!image) {
      alert('Please select a disaster image.');
      return;
    }

    if (!image.file) {
      alert('The selected file is not an image.');
      return;
    }

    if (selectedDisasterType !== 'flood') {
      alert('Flood images are required for damage assessment.');
      return;
    }

    if (!location) {
      alert('Please enter a location.');
      return;
    }

    if (!date) {
      alert('Please select a date.');
      return;
    }

    // If all required fields are filled out, the selected disaster type is 'flood',
    // proceed with the assessment.
    const { response } = await callEnvironmentalDamage(
      image.file,
      selectedDisasterType,
      location,
      date
    );

    if (response) {
      setResponsePercentage(response);
      resetInputs();
      await callGetEnvironmentalDamagePercentage();

      // Reload the page after handling the assessment
      window.location.reload();
    } else {
      alert('An error occurred while calculating the percentage!');
    }
  };

  return (
    <div className={styles.environmentalFloodDamage}>
      <div className={styles.leftSection}>
        <div className={styles.assessForm}>
          <div className={styles.assessedHeader}>Environmental Flood Damage Assessment</div>
          <div className={styles.imagePickerContainer}>
            <ImagePicker
              label="Select disaster image"
              imageData={image?.data}
              onChange={onSelectImage}
            />
          </div>
          <div style={{ height: '60px' }} />
          <Select
            label="Disaster Type"
            onChange={handleDisasterTypeChange}
            options={disasterOptions}
          />
          <Input label="Location" onChange={(e) => setLocation(e.target.value)} />
          <Input type="date" label="Date" onChange={(e) => setDate(e.target.value)} />
          <Button label="Assess Flood Damage" expand onClick={handleEnvironmentalDamage} />
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.assessedHeader}>Assessed properties</div>
        {assessedResponse &&
          assessedResponse.reverse().map((data, index) => (
            <div className={styles.checkedCard} key={index}>
              <div className={styles.detailsContainer}>
                <div className={styles.type}>
                  {disasterOptions.find((e) => e.value === data.disaster_type)?.text || 'Unknown Disaster Type'}
                </div>
                <div className={styles.location}> {data.location}</div>
                <div className={styles.date}>{moment(data.date).format('DD/MM/YYYY')}</div>
              </div>
              <div className={styles.percentage}> {data.percentage_damage}%</div>
            </div>
          ))}
      </div>
      {responsePercentage && (
        <div className={styles.overlayContainer} onClick={() => setResponsePercentage(undefined)}>
          <div className={styles.overlay} onClick={(e) => e.stopPropagation()}>
            <div className={styles.percentageHeader}>Damage Percentage</div>
            <div className={styles.overlayPercentage}>{responsePercentage}%</div>
            <Button label="Close" expand onClick={() => setResponsePercentage(undefined)} />
          </div>
        </div>
      )}
      <Progress showProgress={[isAssessDamageLoading, isLoadingAssessed]} />
    </div>
  );
};


