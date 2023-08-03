import React from 'react'
import styles from './Input.module.scss'

export const Input = ({ label, onChange, type = 'text', name }) => {
  return (
    <div className={styles.inputWrapper}>
      <div className={styles.label}>{label}</div>
      <input className={styles.input} name={name} onChange={onChange} type={type} />
    </div>
  )
}
