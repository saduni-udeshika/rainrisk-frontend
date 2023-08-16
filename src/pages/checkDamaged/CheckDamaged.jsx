import React, { useState } from 'react'
import styles from './CheckDamaged.module.scss'
import { Button, ImagePicker, Progress } from '../../components'
import { getDamaged } from '../../services/damage.assessment.service'
import { useQuery } from '../../hooks'
import { getImageFromFile } from '../../utils'

export const CheckDamaged = () => {
  const [image, setImage] = useState()
  const [damageStatus, setDamageStatus] = useState()
  const { isLoading: isCheckingDamaged, call: callCheckDamage } = useQuery(getDamaged)

  const onSelectImage = async (e) => {
    if (e.target.files === null || e.target.files.length === 0) return
    const visibleUrl = await getImageFromFile(e.target.files[0])
    setImage({
      data: visibleUrl,
      file: e.target.files[0],
    })
  }
  const handleAssessDamageClick = async () => {
    if (!image) {
      alert('Please select an image.')
      return
    }

    const { response } = await callCheckDamage(image.file)
    if (response) {
      setDamageStatus(response)
      setImage(undefined)
    } else {
      alert('An error occurred while checking the damage status!')
    }
  }

  return (
    <div className={styles.checkDamaged}>
      <div className={styles.content}>
        <div className={styles.header}>Check Damaged</div>
        <ImagePicker label="Select image" imageData={image?.data} onChange={onSelectImage} />
        <div style={{ height: '40px' }} />
        <Button label="Check damaged" expand onClick={handleAssessDamageClick} />
      </div>

      {damageStatus && (
        <div className={styles.overlayContainer} onClick={() => setDamageStatus(undefined)}>
          <div className={styles.overlay} onClick={(e) => e.stopPropagation()}>
            <div className={styles.percentageHeader}>Damage Assessment</div>
            <div
              className={
                damageStatus === 'Damage' ? styles.overlayDamaged : styles.overlayNotDamaged
              }
            >
              {damageStatus === 'Damage' ? 'Damaged' : 'Not Damaged'}
            </div>
            <Button label="Close" expand onClick={() => setDamageStatus(undefined)} />
          </div>
        </div>
      )}
      <Progress showProgress={[isCheckingDamaged]} />
    </div>
  )
}
