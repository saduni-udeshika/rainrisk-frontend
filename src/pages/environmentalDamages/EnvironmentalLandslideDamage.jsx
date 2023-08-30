import { useEffect, useState } from 'react';
import styles from './EnvironmentalLandslideDamage.scss';
import { Button, ImagePicker, Input, Progress, Select } from '../../components';
import { useQuery } from '../../hooks';
import { getImageFromFile } from '../../utils';
import { calculateEnvironmentalLandslideDamagePercentage } from '../../services/environmental.landslide.assessment.service';

export const EnvironmentalLandslideDamage = () => {
  const [image, setImage] = useState();
  const [selectedDisasterType, setSelectedDisasterType] = useState('flood');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
 
  const disasterOptions = [
    { value: 'landslides', text: 'Landslides' },
    { value: 'flood', text: 'Flood' },
  ];

  const handleDisasterTypeChange = (e) => {
    setSelectedDisasterType(e.target.value)
  }

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
    setSelectedDisasterType('flood'); // Reset disaster type to default
    setLocation(''); // Clear location
    setDate(''); // Clear date
  };

  const handleEnvironmentalDamage = async () => {
    if (image && selectedDisasterType && location && date) {
      try {
        const response = await calculateEnvironmentalLandslideDamagePercentage(
          image.file,
          selectedDisasterType,
          location,
          date
        );
        
        resetInputs()
        
      } catch (error) {
        // Handle error, e.g., show an error message
        console.error('Error assessing flood damage:', error);
      }
    } else {
      // Handle case where not all required fields are filled
      console.error('Please fill all required fields.');
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
    </div>
  );
};
