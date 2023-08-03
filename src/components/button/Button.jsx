import React from 'react'
import styles from './Button.module.scss'

export const Button = ({ label, onClick, expand }) => {
  return (
    <button className={expand ? styles.buttonExpanded : styles.button} onClick={onClick}>
      {label}
    </button>
  )
}
