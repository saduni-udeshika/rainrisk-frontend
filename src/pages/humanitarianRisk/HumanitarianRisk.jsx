import React, { useState, useEffect } from 'react'
import styles from './HumanitarianRisk.module.scss'
import { Progress } from '../../components'
import { useQuery } from '../../hooks'
import { humanitarianRisk, getFloodlistPosts, postQuery } from '../../services/humanitarian.risk.assessment.service'

export const HumanitarianRisk = () => {
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [spec_name, setSpecName] = useState('')
  const [death_count, setDeathCount] = useState('')
  const [injured_count, setInjuredCount] = useState('')
  const [missing_count, setMissingCount] = useState('')
  const [evacuated_count, setEvacuatedCount] = useState('')
  const [hospitalized_count, setHospitalizedCount] = useState(0)
  const [additional_comment, setAdditionalComment] = useState('')
  const [disaster_type, setSelectedOption] = useState("flood")
  const [severity_level, setServerityLevel] = useState("low")
  const [medical_availability, setMedicalAvailability] = useState("no")
  const [clean_water_availability, setClnWaterAvailability] = useState("no")
  const [food_availability, setFoodAvailability] = useState("no")
  const [shelter_availability, setShelterAvailability] = useState("no")
  const [communication_disruption, setComDistruption] = useState("yes")
  const [transport_disruption, setTransDistruption] = useState("yes")
  const [humanitarianrisk, setHumanitarianRisk] = useState('')
  const [searchQuery, setSearchQuery] = useState('');

  // const { isLoading: isArticleLoading, call: callNewsArticles } =
  //   useQuery(getFloodlistPosts)
  // const [newsArticles, setNewsArticles] = useState()

  const {
    isLoading: isArticleLoading,
    call: callNewsArticles,
    response: newsArticles,
  } = useQuery(getFloodlistPosts)

  useEffect(() => {
    callNewsArticles()
  }, [])

  const handleDataPostClick = async (event) => {
    event.preventDefault();

    if (date && death_count && injured_count && missing_count && evacuated_count && hospitalized_count && severity_level && medical_availability && clean_water_availability && food_availability && shelter_availability) {
      try {
        const response = await humanitarianRisk(date, location, spec_name, disaster_type, severity_level, death_count, injured_count,
          missing_count, evacuated_count, medical_availability, hospitalized_count, clean_water_availability, food_availability, shelter_availability, communication_disruption, transport_disruption, additional_comment)
        console.log(response.data)
        setHumanitarianRisk(response.data)
        // Clear the input fields after successful prediction
        clearInputs()
      } catch (error) {
        console.error('Error posting', error)
      }
    }
  }

  const handleSearch = async (event) => {
    event.preventDefault();

    if (searchQuery.trim() !== '') {
      try {
        const response = await postQuery(searchQuery);
        // console.log(response.data);
        // toast.success("Query Search Successful!");
        alert("Query Search Successful!");

        setSearchQuery('');
      } catch (error) {
        console.error('Error searching', error);
      }
    }
  };


  const clearInputs = () => {
    setDate('')
    setLocation('')
    setSpecName('')
    setDeathCount('')
    setInjuredCount('')
    setMissingCount('')
    setEvacuatedCount('')
    setHospitalizedCount('')
    setAdditionalComment('')
    setSelectedOption("flood")
    setServerityLevel("low")
    setMedicalAvailability("no")
    setClnWaterAvailability("no")
    setFoodAvailability("no")
    setShelterAvailability("no")
    setComDistruption("yes")
    setTransDistruption("yes")
  }


  return (
    <div className={styles.floatContainer}>
      <div className={styles.floatChild}>
        <div className={styles.floatChild.green}>
          <div className={styles.formHeader}>Disaster Report Form</div>
          <form onSubmit={handleDataPostClick} >
            <div>
              {/* Date and Time */}
              <h5>Date of Incident</h5>
              <div>
                Date: <input className={styles.inputField} type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>

              {/* Location and Disaster Type */}
              <h5>Location and Disaster Type</h5>
              <div>
                Location: <input className={styles.inputField} type="text" value={location} onChange={(e) => setLocation(e.target.value)} required /><br />
                Specific Name for Disaster: <input className={styles.inputField} type="text" value={spec_name} onChange={(e) => setSpecName(e.target.value)} /><br />
                Disaster Type:
                <select className={styles.inputField} name="disaster_type" value={disaster_type} onChange={(e) => setSelectedOption(e.target.value)} required>
                  <option selected>Open this select menu</option>
                  <option value="flood">Flood</option>
                  <option value="landslide">Landslide</option>
                </select>
              </div>

              {/* Severity Level */}
              <h5>Severity Level</h5>
              <div>
                <div>
                  <div>
                    Severity Level:
                    <select className={styles.inputField} name="severity_level" value={severity_level} onChange={(e) => setServerityLevel(e.target.value)}>
                      <option selected>Open this select menu</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Casualty Counts */}
              <h5>Casualty Counts</h5>
              <div>
                Death Count: <input className={styles.inputField} type="number" name="death_count" value={death_count} onChange={(e) => setDeathCount(e.target.value)} required />
                <br />
                Injured Count: <input className={styles.inputField} type="number" name="injured_count" value={injured_count} onChange={(e) => setInjuredCount(e.target.value)} required />
                <br />
                Missing Count: <input className={styles.inputField} type="number" name="missing_count" value={missing_count} onChange={(e) => setMissingCount(e.target.value)} required />
                <br />
                Evacuated Count: <input className={styles.inputField} type="number" name="evacuated_count" value={evacuated_count} onChange={(e) => setEvacuatedCount(e.target.value)} required />
                <br />
                Hospitalized Count: <input className={styles.inputField} type="number" name="hospitalized_count" value={hospitalized_count} onChange={(e) => setHospitalizedCount(e.target.value)} required />
              </div>

              {/* Availability */}
              <h5>Availability</h5>
              <div>
                <div>
                  <div>
                    Medical Availability:
                    <select className={styles.inputField} name="medical_availability" value={medical_availability} onChange={(e) => setMedicalAvailability(e.target.value)}>
                      <option selected>Open this select menu</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
                <div>
                  <div>
                    Clean Water Availability:
                    <select className={styles.inputField} name="clean_water_availability" value={clean_water_availability} onChange={(e) => setClnWaterAvailability(e.target.value)}>
                      <option selected>Open this select menu</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
                <div>
                  <div>
                    Food Availability:
                    <select className={styles.inputField} name="food_availability" value={food_availability} onChange={(e) => setFoodAvailability(e.target.value)}>
                      <option selected>Open this select menu</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
                <div>
                  <div>
                    Shelter Availability:
                    <select className={styles.inputField} name="shelter_availability" value={shelter_availability} onChange={(e) => setShelterAvailability(e.target.value)}>
                      <option selected>Open this select menu</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Disruption */}
              <h5>Disruption</h5>
              <div>
                <div>
                  <div>
                    Communication Disruption:
                    <select className={styles.inputField} name="communication_disruption" value={communication_disruption} onChange={(e) => setComDistruption(e.target.value)}>
                      <option selected>Open this select menu</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
                <div>
                  <div>
                    Transport Disruption:
                    <select className={styles.inputField} name="transport_disruption" value={transport_disruption} onChange={(e) => setTransDistruption(e.target.value)}>
                      <option selected>Open this select menu</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Comment */}
              <h5>Additional Comment: </h5>
              <textarea name="additional_comment" rows="4" cols="50" value={additional_comment} onChange={(e) => setAdditionalComment(e.target.value)}></textarea><br />
            </div>
            <button className={styles.submitButton}>Submit</button>
          </form>
        </div>
      </div>
      <div className={styles.floatChild}>
        <div className={styles.floatChild.blue}>
          <div className={styles.searchGroup}>
            <input
              type="search"
              name="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter your search query"
            />
            <button onClick={handleSearch}>Search Keyword</button>
          </div>
          <div>
            {newsArticles &&
              newsArticles.reverse().map((data, index) => (
                <div className={styles.checkedCard} key={index}>
                  <div className={styles.detailsContainer}>
                    <div className={styles.postContent}>{data["Post Content"]}</div>
                  </div>
                </div>
              ))}
            <Progress showProgress={[isArticleLoading]} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HumanitarianRisk
