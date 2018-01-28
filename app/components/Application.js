import { ANONYMOUS, SIGNED_IN } from 'actions/auth'
import { func, object } from 'prop-types'
import React from 'react'
import SignIn from 'views/SignIn'
import Wrapper from 'views/Wrapper'

const App = ({auth, signIn, signOut}) =>
  <main>
    {auth.status === ANONYMOUS && <SignIn signIn={signIn} />}
    {auth.status === SIGNED_IN && <Wrapper user={auth} signOut={signOut}/>}
  </main>

App.propTypes = {
  auth: object.isRequired,
  signIn: func.isRequired,
  signOut: func.isRequired,
}

export default App
