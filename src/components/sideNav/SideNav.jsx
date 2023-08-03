import React from 'react'
import styles from './SideNav.module.scss'
import { Routes } from '../../routes'
import { Link } from 'react-router-dom'

export const SideNav = () => {
  return (
    <div className={styles.sideNav}>
      {Routes.map((route, index) => (
        <Link className={styles.menuItem} key={index} to={route.path}>
          {route.name}
        </Link>
      ))}
    </div>
  )
}
