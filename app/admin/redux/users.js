import { usersRef } from 'firebaseConfig'
import dot from 'dot-prop-immutable'

const types = {
  SET_USERS: 'users/SET_USERS',
  UPDATE_USER: 'users/UPDATE_USER'
}

export const actions = {
  getUsers: () => dispatch => {
    // todo: consider adding role param here to fetch users per role
    usersRef.get().then(usersSnapshot => {
      const usersMap = {}

      usersSnapshot.forEach(user => {
        usersMap[user.id] = user.data()
      })

      dispatch({
        type: types.SET_USERS,
        payload: usersMap
      })
    })
  },
  toggleUserRole: (userId, roles) => dispatch => {
    usersRef
      .doc(userId)
      .update({ roles })
      .then(() => {
        dispatch({
          type: types.UPDATE_USER,
          payload: {
            userId,
            roles
          }
        })
      })
  }
}

export const getTutors = () => dispatch => {}

export default (state = {}, action) => {
  switch (action.type) {
    case types.SET_USERS: {
      return action.payload
    }

    case types.UPDATE_USER: {
      const { userId, roles } = action.payload
      return dot.set(state, `${userId}.roles`, roles)
    }

    default:
      return state
  }
}
