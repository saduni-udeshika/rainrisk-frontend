import React, { useEffect, useState } from 'react';
import { Button, ImagePicker, Input, Progress, Select } from '../../components';
import { useQuery } from '../../hooks';
import { getImageFromFile } from '../../utils';
import { calculateEnvironmentalLandslideDamagePercentage, getEnvironmentalLandslideDamagePercentage } from '../../services/environmental.landslide.assessment.service';
import moment from 'moment/moment';
import styles from './EnvironmentalLandslideDamage.module.scss';

export const EnvironmentalLandslideDamage = () => {
  const [image, setImage] = useState();
  const [selectedDisasterType, setSelectedDisasterType] = useState('landslide');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const { isLoading: isAssessDamageLoading, call: callEnvironmentalDamage } =
    useQuery(calculateEnvironmentalLandslideDamagePercentage)
  const {
    isLoading: isLoadingAssessed,
    call: callGetEnvironmentalDamagePercentage,
    response: assessedResponse,
  } = useQuery(getEnvironmentalLandslideDamagePercentage)
  const [responsePercentage, setResponsePercentage] = useState()

  const handleDisasterTypeChange = (e) => {
    setSelectedDisasterType(e.target.value)
  }

  useEffect(() => {
    callGetEnvironmentalDamagePercentage()
  }, [])

  const disasterOptions = [
    { value: 'landslide', text: 'Landslide' },
    { value: 'flood', text: 'Flood' },
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
    setSelectedDisasterType('landslide'); 
    setLocation(''); 
    setDate('');
  };

  const handleEnvironmentalDamage = async () => {
    if (!image || !selectedDisasterType || !location || !date) {
      alert('Please fill in all required fields.');
      return;
    }
  
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
    <div className={styles.environmentalLandslideDamage}>
      <div className={styles.leftSection}>
        <div className={styles.assessForm}>
          <div className={styles.assessedHeader}>Environmental Landslide Damage Assessment</div>
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
          <Button label="Assess Landslide Damage" expand onClick={handleEnvironmentalDamage} />
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
                <div className={styles.location}>{data.location}</div>
                <div className={styles.date}>{moment(data.date).format('DD/MM/YYYY')}</div>
              </div>
              <div className={styles.percentage}>{data.percentage_damage}%</div>
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
