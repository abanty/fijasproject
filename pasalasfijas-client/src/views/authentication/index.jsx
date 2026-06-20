'use client'

import SignIn from './components/sign-in'
import SignUp from './components/sign-up'

const Authentication = ({ mode, view = 'sign-in' }) => {
  switch (view) {
    case 'sign-up':
      return <SignUp mode={mode} />
    case 'sign-in':
    default:
      return <SignIn mode={mode} />
  }
}

export default Authentication
