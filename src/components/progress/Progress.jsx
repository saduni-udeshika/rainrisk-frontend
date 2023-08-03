import React, { useMemo } from 'react'
import styles from './Progress.module.scss'
import './ProgressSpinner.scss'

export const Progress = ({ showProgress }) => {
  const shouldShowProgress = useMemo(() => {
    if (Array.isArray(showProgress)) return showProgress.includes(true)
    return showProgress
  }, [showProgress])

  return (
    <>
      {shouldShowProgress && (
        <div className={styles.progress}>
          <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </>
  )
}
