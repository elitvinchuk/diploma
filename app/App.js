import { pick } from 'lodash'
import React from 'react'
import { auth, database } from './firebase'
import SignIn from './views/SignIn'
import Wrapper from './views/Wrapper'

class App extends React.Component {
  state = {
    user: null
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user })
      }
    })
  }

  render() {
    const { user } = this.state

    return user
      ? <Wrapper user={user} />
      : <SignIn/>
  }
}

export default App
