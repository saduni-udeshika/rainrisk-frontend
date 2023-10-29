import React from 'react'
import { BuildingDamages, CheckDamaged, Home, DisasterForecast, EnvironmentalDamage, HumanitarianRisk, EmbeddedDashboard } from '../pages'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';

export const Routes = [
  {
    name: 'Home',
    path: '/',
    component: () => <Home />,
  },
  {
    name: 'Building Damage',
    path: '/assess-damage',
    component: () => <BuildingDamages />,
  },
  {
    name: 'Check Damaged',
    path: '/check-damaged',
    component: () => <CheckDamaged />,
    icon: <FontAwesomeIcon icon={faBuilding} />,
  },
  {
    name: 'Environment Risk',
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
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: () => <EmbeddedDashboard />
  }
]
