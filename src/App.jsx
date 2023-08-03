import { BrowserRouter } from 'react-router-dom'
import styles from './App.module.scss'
import { Router } from './routes'
import { Navbar, SideNav } from './components'
import { AuthContainer } from './components/authContainer/AuthContainer'

function App() {
  return (
    <div className={styles.appContainer}>
      <div className={styles.appWrapper}>
        <AuthContainer>
          <BrowserRouter>
            <Navbar />
            <div className={styles.app}>
              <SideNav />
              <Router />
            </div>
          </BrowserRouter>
        </AuthContainer>
      </div>
    </div>
  )
}

export default App
