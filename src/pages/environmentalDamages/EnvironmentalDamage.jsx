import React from 'react'
import { EnvironmentalFloodDamage } from './EnvironmentalFloodDamage'
import { EnvironmentalLandslideDamage } from './EnvironmentalLandslideDamage'

export const EnvironmentalDamage = () => {
  return (
    <div>
        <EnvironmentalFloodDamage />
        <br></br>
        <hr></hr>
        <br></br>
        <EnvironmentalLandslideDamage />
    </div>
  )
}
