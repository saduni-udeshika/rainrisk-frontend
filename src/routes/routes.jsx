import React from 'react'
import { BuildingDamages, CheckDamaged, Home } from '../pages'
import { EnvironmentalFloodDamage } from '../pages/environmentalDamages/EnvironmentalFloodDamage'

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
    name: 'Environment Risk',
    path: '/environment-risk',
    component: () => <EnvironmentalFloodDamage />,
  },
  {
    name: 'Humanitarian Risk',
    path: '/humanitarian-risk',
    component: () => <div />,
  },
  {
    name: 'Disaster Forecast',
    path: '/disaster-forecast',
    component: () => <div />,
  },
]
