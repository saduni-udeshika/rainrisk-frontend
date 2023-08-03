import React, { useState } from 'react'
import styles from './BuildingDamages.module.scss'
import { Button, ImagePicker, Input, Select } from '../../components'
import { getImageFromFile } from '../../utils'

export const BuildingDamages = () => {
  const [preDisasterImage, setPreDisasterImage] = useState()
  const [postDisasterImage, setPostDisasterImage] = useState()

  const onSelectPreDisaster = async (e, type) => {
    if (e.target.files === null || e.target.files.length === 0) return
    const visibleUrl = await getImageFromFile(e.target.files[0])
    type === 'pre'
      ? setPreDisasterImage({
          data: visibleUrl,
          file: e.target.files[0],
        })
      : setPostDisasterImage({
          data: visibleUrl,
          file: e.target.files[0],
        })
  }

  return (
    <div className={styles.buildingDamages}>
      <div className={styles.leftSection}>
        <div className={styles.assessForm}>
          <div className={styles.assessedHeader}>Assess Damage</div>
          <div className={styles.imagePickerContainer}>
            <ImagePicker
              label="Select pre-disaster image"
              imageData={preDisasterImage?.data}
              onChange={(e) => onSelectPreDisaster(e, 'pre')}
            />
            <ImagePicker
              label="Select post-disaster image"
              imageData={postDisasterImage?.data}
              onChange={(e) => onSelectPreDisaster(e, 'post')}
            />
          </div>
          <div style={{ height: '60px' }} />
          <Select label="Disaster Type" />
          <Input label="Location" />
          <Input type="date" label="Date" />
          <Button label="Assess Damage" expand />
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.assessedHeader}>Assessed properties</div>
        <div className={styles.checkedCard}>
          <div className={styles.detailsContainer}>
            <div className={styles.type}>Landslide</div>
            <div className={styles.location}>Flower road, Nuwara Eliya</div>
            <div className={styles.date}>02/04/2022</div>
          </div>
          <div className={styles.percentage}>78%</div>
        </div>
      </div>
    </div>
  )
}
