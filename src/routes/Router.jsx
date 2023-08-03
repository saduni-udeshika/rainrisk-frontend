import { useLocation } from 'react-router-dom'
import { Routes } from './routes'
import styles from './Router.module.scss'

export const Router = () => {
  const location = useLocation()

  return <div className={styles.route}>{Routes.find((e) => e.path === location.pathname)?.component()}</div>
}
