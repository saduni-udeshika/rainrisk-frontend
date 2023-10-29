import { http } from '../http'

export const humanitarianRisk = async (
    date, 
    location, 
    spec_name, 
    disaster_type, 
    severity_level, 
    death_count, 
    injured_count,
    missing_count, 
    evacuated_count,
    medical_availability, 
    hospitalized_count, 
    clean_water_availability, 
    food_availability, 
    shelter_availability, 
    communication_disruption, 
    transport_disruption,
    additional_comment
  ) => {
    const formData = new FormData()
    formData.append('incdnt_date', date)    
    formData.append('location', location)
    formData.append('spec_name', spec_name)
    formData.append('disaster_type', disaster_type)
    formData.append('severity_level', severity_level)
    formData.append('death_count', death_count)
    formData.append('injured_count', injured_count)
    formData.append('missing_count', missing_count)
    formData.append('evacuated_count', evacuated_count)
    formData.append('medical_availability', medical_availability)
    formData.append('hospitalized_count', hospitalized_count)
    formData.append('clean_water_availability', clean_water_availability)
    formData.append('food_availability', food_availability)
    formData.append('shelter_availability', shelter_availability)
    formData.append('communication_disruption', communication_disruption)
    formData.append('transport_disruption', transport_disruption)
    formData.append('additional_comment', additional_comment)

    // return await http.withToken.post(
    //     'http://127.0.0.1:5173/disaster_report_form',
    //     formData,
    //     {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     }
    // );

    return http.withToken.post(`disaster_report_form`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
    });
    
  }

export const getAdaderanaNews = async () => {
    return http.withToken.get('get-adaderana');
};

export const getFloodlistPosts = async () => {
    return http.withToken.get('get-news');
};


export const postQuery = async (
  user_query
) => {
  const formData = new FormData()
  formData.append('user_query', user_query)
  
  return http.withToken.post(`adaderana_scrape`, formData);
};