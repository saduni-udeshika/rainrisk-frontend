import styles from './Navbar.module.scss'

export const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        RainRisk <span className={styles.logoNet}>NET</span>
      </div>

      <div className={styles.navLink}>About</div>
      <div className={styles.navLink}>Contact</div>
      <div
        className={styles.logout}
        onClick={() => {
          localStorage.clear()
          window.location.reload()
        }}
      >
        Logout
      </div>
    </div>
  )
}
