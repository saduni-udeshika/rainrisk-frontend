import React from 'react'
import { BuildingDamages, Home } from '../pages'

export const Routes = [
  {
    name: 'Home',
    path: '/',
    component: () => <Home />,
  },
  {
    name: 'Building Damage',
    path: '/building-damage',
    component: () => <BuildingDamages />,
  },
  {
    name: 'Environment Risk',
    path: '/environment-risk',
    component: () => <div />,
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
