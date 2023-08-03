import React from 'react'
import { AuthContext } from '../../components'
import styles from './home.module.scss'

export const Home = () => {
  const authContext = React.useContext(AuthContext)
  return <div className={styles.home}>Welcome {authContext?.user?.firstName}</div>
}
