import { pick } from 'lodash'
import { database } from '../../app/firebase'

export const ADD_USER = 'ADD_USER'

const usersRef = database.ref('users')

export const addUser = (user) => ({
  type: ADD_USER,
  payload: {
    ...user
  }
})

export const listenForUsersChange = () =>
  dispatch => {
    usersRef.on('child_added', (snapshot) => {
      // console.log(snapshot.key())
      // console.log(snapshot.val())
      // dispatch(addUser(pick(snapshot.val(), ['displayName', 'photoURL', 'email', 'uid'])))
      dispatch(addUser(snapshot.val()))
    })
  }
