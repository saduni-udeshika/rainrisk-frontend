import React from 'react'
import { EnvironmentalFloodDamage } from './EnvironmentalFloodDamage'
import { EnvironmentalLandslideDamage } from './EnvironmentalLandslideDamage'

export const EnvironmentalDamage = () => {
  return (
    <div>
        <EnvironmentalFloodDamage />
        <EnvironmentalLandslideDamage />
    </div>
  )
}
