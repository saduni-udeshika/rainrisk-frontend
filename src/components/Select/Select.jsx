import React from 'react'
import styles from './Select.module.scss'

export const Select = ({ label, onChange, options = [] }) => {
  return (
    <div className={styles.selectWrapper}>
      <div className={styles.label}>{label}</div>
      <select onChange={onChange} className={styles.select}>
        {options.map((option, index) => (
          <option value={option.value} key={index}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  )
}
