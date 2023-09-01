import React from 'react'
import { BuildingDamages, CheckDamaged, Home } from '../pages'
import { EnvironmentalFloodDamage } from '../pages/environmentalDamages/EnvironmentalFloodDamage'
import { EnvironmentalLandslideDamage } from '../pages/environmentalDamages/EnvironmentalLandslideDamage'
import { DisasterForecast } from '../pages/disasterForecast/DisasterForecast'

export const Routes = [
  {
    name: 'Home',
    path: '/',
    component: () => <Home />,
  },
  {
    name: 'Assess Damage',
    path: '/assess-damage',
    component: () => <BuildingDamages />,
  },
  {
    name: 'Check Damaged',
    path: '/check-damaged',
    component: () => <CheckDamaged />,
  },
  {
    name: 'Environment Flood Damage',
    path: '/environment-flood-damage',
    component: () => <EnvironmentalFloodDamage />,
  },
  {
    name: 'Environment Landslide Damage',
    path: '/environment-landslide-damage',
    component: () => <EnvironmentalLandslideDamage />,
  },
  {
    name: 'Disaster Forecast',
    path: '/disaster-forecast',
    component: () => <DisasterForecast />,
  },
  {
    name: 'Humanitarian Risk',
    path: '/humanitarian-risk',
    component: () => <div />,
  }
]
