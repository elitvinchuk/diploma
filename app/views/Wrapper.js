import { map, pick } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import StudentCard from 'views/StudentCard'
import { auth, database } from '../firebase'

class Wrapper extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  constructor (props) {
    super(props)

    this.userRef = null
    this.usersRef = null
    this.state = {
      users: null,
    }
  }

  componentDidMount () {
    const {user} = this.props

    this.usersRef = database.ref('/users')
    this.userRef = this.usersRef.child(user.uid)

    this.userRef.once('value').then(snapshot => {
      if (snapshot.val()) return

      const userData = pick(user, ['displayName', 'photoURL', 'email'])
      this.userRef.set(userData)
    })

    this.usersRef.on('value', snapshot => {
      this.setState({
        users: snapshot.val(),
      })
    })
  }

  render () {
    const {user} = this.props
    const {users} = this.state

    return (
      <>
      <nav
        className="navbar sticky-top navbar-dark bg-dark justify-content-end">
        <span className="navbar-text">
          {user.displayName}
        </span>
        <button className="btn btn-outline-secondary"
                onClick={() => auth.signOut()} type="button">Выйти
        </button>
      </nav>

      <div className="container-fluid">
        {map(users, (user, uid) => <StudentCard key={uid} user={user} uid={uid}
                                                userRef={this.userRef}/>)}
      </div>
      </>
    )
  }
}

export default Wrapper
