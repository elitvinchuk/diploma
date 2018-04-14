import { actions as coursesActions } from 'admin/redux/courses'
import { actions as usersActions } from 'admin/redux/users'
import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'
import r from 'routes'
import CoursesList from './CoursesList'
import UsersList from './UsersList'

@connect()
class AdminView extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(coursesActions.getCourses())
    dispatch(usersActions.getUsers(/*'tutors'*/)) // todo: improve getUsers
  }

  render() {
    return (
      <>
        <Route path={r.courses} component={CoursesList} />
        <Route path={r.users} component={UsersList} />
        <Redirect from={r.index} to={r.courses} />
      </>
    )
  }
}

export default AdminView
