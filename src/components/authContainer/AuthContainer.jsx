import React, { useEffect, useState } from 'react'
import authBg from '../../assets/authBg.png'
import styles from './AuthContainer.module.scss'
import { Input, Button, Progress } from '..'
import { useQuery } from '../../hooks'
import { getUser, signIn, signUp } from '../../services'
import { setAuthTokens } from '../../utils'

export const AuthContext = React.createContext({ user: undefined })

const AuthLayout = ({ onAuth }) => {
  const [isLogin, setIsLogin] = useState('login')
  const { isLoading: isSigningUp, call: callSignup } = useQuery(signUp)
  const { isLoading: isLoadingUser, call: callGetUser } = useQuery(getUser)
  const { isLoading: isSigningIn, call: callSignIn } = useQuery(signIn)
  // const { isLoading: isAssessDamageLoading, call: callAssessDamage, response } = useQuery(getAssessDamage)

  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    verifyPassword: '',
  })

  const handleChangeInput = (e) => setInputs({ ...inputs, [e.target.name]: e.target.value })

  const handleSignup = async () => {
    if (Object.values(inputs).some((input) => input.length === 0)) {
      alert('Please fill in all fields')
      return
    }
    if (inputs.password !== inputs.verifyPassword) {
      alert('Passwords does not match')
      return
    }
    const { response } = await callSignup(inputs)
    console.log(response)
    if (response.status === 'success') {
      const accessToken = response.access_token
      setAuthTokens(accessToken)
      const { response: userResponse } = await callGetUser()
      onAuth(userResponse.user)
    } else if (response.message === 'user_exists') {
      alert('User with given email already exists')
    }
  }

  const handleLogin = async () => {
    const { response } = await callSignIn(inputs.email, inputs.password)
    if (response.status === 'success') {
      const accessToken = response.access_token
      setAuthTokens(accessToken)
      onAuth(response.user)
    } else {
      alert('Invalid credentials')
    }
  }

  return (
    <div className={styles.authLayout}>
      <div className={styles.header}>
        RainRisk <span className={styles.net}>Net</span>
      </div>
      <div className={styles.authImageContainer}>
        <img src={authBg} className={styles.authImage} />
      </div>
      <div className={styles.authFormContainer}>
        <div className={styles.authForm}>
          <div className={styles.welcome}>Welcome</div>
          <div className={styles.noAccount}>
            Don't have an account?{' '}
            <span className={styles.authButton} onClick={() => setIsLogin((e) => !e)}>
              {isLogin ? 'Signup' : 'Login'}
            </span>
          </div>
          {isLogin ? (
            <>
              <Input label="Email" name="email" onChange={handleChangeInput} value={inputs.email} />
              <Input
                label="Password"
                type="password"
                name="password"
                onChange={handleChangeInput}
                value={inputs.password}
              />
              <Button label="Login" expand onClick={handleLogin} />
            </>
          ) : (
            <>
              <Input
                label="First name"
                name="firstName"
                onChange={handleChangeInput}
                value={inputs.firstName}
              />
              <Input
                label="Last name"
                name="lastName"
                onChange={handleChangeInput}
                value={inputs.lastName}
              />
              <Input label="Email" name="email" onChange={handleChangeInput} value={inputs.email} />
              <Input
                label="Password"
                type="password"
                name="password"
                onChange={handleChangeInput}
                value={inputs.password}
              />
              <Input
                label="Verify password"
                type="password"
                name="verifyPassword"
                onChange={handleChangeInput}
                value={inputs.verifyPassword}
              />
              <Button label="Signup" expand onClick={handleSignup} />
            </>
          )}
        </div>
      </div>
      <Progress showProgress={[isSigningUp, isLoadingUser, isSigningIn]} />
    </div>
  )
}

export const AuthContainer = ({ children }) => {
  const [user, setUser] = useState(undefined)
  const { isLoading: isLoadingUser, call: callGetUser } = useQuery(getUser)

  const autoLogin = async () => {
    const { response: userResponse } = await callGetUser()
    if (userResponse.status === 'success') {
      setUser(userResponse.user)
    }
  }

  useEffect(() => {
    autoLogin()
  }, [])

  return (
    <>
      {user ? (
        <AuthContext.Provider value={{ user: user }}>{children}</AuthContext.Provider>
      ) : (
        <AuthLayout onAuth={(user) => setUser(user)} />
      )}
      <Progress showProgress={[isLoadingUser]} />
    </>
  )
}
