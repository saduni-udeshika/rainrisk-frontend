import React from 'react'
import { BuildingDamages, CheckDamaged, Home, DisasterForecast, EnvironmentalDamage, HumanitarianRisk } from '../pages'

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
    name: 'Assess Risk',
    path: '/assess-risk',
    component: () => <EnvironmentalDamage />,
  },
  {
    name: 'Disaster Forecast',
    path: '/disaster-forecast',
    component: () => <DisasterForecast />,
  },
  {
    name: 'Humanitarian Risk',
    path: '/humanitarian-risk',
    component: () => <HumanitarianRisk />,
  }
]
