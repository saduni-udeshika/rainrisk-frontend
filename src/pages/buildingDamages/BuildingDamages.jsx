import { useEffect, useState } from 'react'
import { Button, ImagePicker, Input, Progress, Select } from '../../components'
import { useQuery } from '../../hooks'
import { getImageFromFile } from '../../utils'
import { calculateDamagePercentage, getAssessed } from '../../services/damage.assessment.service'
import moment from 'moment/moment'
import styles from './BuildingDamages.module.scss'

export const BuildingDamages = () => {
  const [preDisasterImage, setPreDisasterImage] = useState()
  const [postDisasterImage, setPostDisasterImage] = useState()
  const [selectedDisasterType, setSelectedDisasterType] = useState('landslides')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const { isLoading: isAssessDamageLoading, call: callAssessDamage } =
    useQuery(calculateDamagePercentage)
  const {
    isLoading: isLoadingAssessed,
    call: callGetAssessed,
    response: assessedResponse,
  } = useQuery(getAssessed)
  const [responsePercentage, setResponsePercentage] = useState()

  const handleDisasterTypeChange = (e) => {
    setSelectedDisasterType(e.target.value)
  }

  useEffect(() => {
    callGetAssessed()
  }, [])

  const disasterOptions = [
    { value: 'landslides', text: 'Landslides' },
    { value: 'earthquake', text: 'Earthquake' },
    { value: 'flood', text: 'Flood' },
  ]

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

  const resetInputs = () => {
    setPreDisasterImage(undefined)
    setPostDisasterImage(undefined)
    setSelectedDisasterType('landslide')
    setLocation('')
    setDate('')
  }

  const handleAssessDamageClick = async () => {
    if (!preDisasterImage || !postDisasterImage || !selectedDisasterType || !location || !date) {
      alert('Please fill in all required fields.')
      return
    }

    const { response } = await callAssessDamage(
      preDisasterImage.file,
      postDisasterImage.file,
      selectedDisasterType,
      location,
      date,
    )
    if (response) {
      setResponsePercentage(response)
      resetInputs()
      await callGetAssessed()
    } else {
      alert('An error occurred while calculating the percentage!')
    }
  }

  return (
    <div className={styles.buildingDamages}>
      <div className={styles.leftSection}>
        <div className={styles.assessForm}>
          <div className={styles.assessedHeader}>Assess Building Damage</div>
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
          <Select
            label="Disaster Type"
            onChange={handleDisasterTypeChange}
            options={disasterOptions}
          />
          <Input label="Location" onChange={(e) => setLocation(e.target.value)} />
          <Input type="date" label="Date" onChange={(e) => setDate(e.target.value)} />
          <Button label="Assess Building Damage" expand onClick={handleAssessDamageClick} />
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.assessedHeader}>Assessed properties</div>
        {assessedResponse &&
          assessedResponse.reverse().map((data, index) => (
            <div className={styles.checkedCard} key={index}>
              <div className={styles.detailsContainer}>
                <div className={styles.type}>
                  {disasterOptions.find((e) => e.value === data.disaster_type).text}
                </div>
                <div className={styles.location}>{data.location}</div>
                <div className={styles.date}>{moment(data.date).format('DD/MM/YYYY')}</div>
              </div>
              <div className={styles.percentage}>{data.damage_percentage}%</div>
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
  )
}
