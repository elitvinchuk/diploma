import { actions as coursesActions } from 'admin/redux/courses'
import { actions as usersActions } from 'admin/redux/users'
import { AdminCoursesList, UsersList } from 'admin/views'
import { ErrorBoundary, Header, NotFound } from 'common/components'
import Loader from 'common/components/Loader'
import { selectors } from 'common/redux/auth'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { NavLink, Redirect, Route, Switch } from 'react-router-dom'
import r from 'routes'
import { Application, ApplicationsList, Calendar } from 'tutor/views'
import { ApplicationItem, StudentCoursesList } from 'student/views'
import { actions as studentActions } from 'student/redux/applications'
import { actions as tutorActions } from 'tutor/redux/applications'

@connect(state => ({
  user: selectors.getAuthenticatedUser(state)
}))
class HomeComponent extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    user: PropTypes.object
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(coursesActions.getCourses())
    dispatch(usersActions.getUsers()).then(() => {
      const {
        user: { roles }
      } = this.props
      if (roles['student']) {
        dispatch(studentActions.getApplications())
      }

      if (roles['tutor']) {
        dispatch(tutorActions.getApplications())
      }
    })
  }

  render() {
    const { user } = this.props

    if (!user) {
      return <Loader fullscreen />
    }

    // todo: LOW consider moving to cdu
    const isAdmin = this.props.user.roles['admin']
    const isStudent = this.props.user.roles['student']
    const isTutor = this.props.user.roles['tutor']

    const redirectRoute = isAdmin ? r.admin.courses : isTutor ? r.courses : r.student.courses

    return (
      <ErrorBoundary>
        <Header user={user}>
          {isAdmin && (
            <>
              <NavLink to={r.admin.courses} className="nav-item nav-link">
                Предметы
              </NavLink>
              <NavLink to={r.admin.users} className="nav-item nav-link">
                Пользователи
              </NavLink>
            </>
          )}
          {isTutor && (
            <>
              <NavLink to={r.tutors.applications} className="nav-item nav-link">
                Обращения
              </NavLink>
              <NavLink to={r.tutors.calendar} className="nav-item nav-link">
                Календарь
              </NavLink>
            </>
          )}
          {isStudent && (
            <NavLink to={r.student.applications} className="nav-item nav-link">
              Предметы
            </NavLink>
          )}
        </Header>

        <div className="container">
          <Switch>
            {isAdmin && <Route path={r.admin.courses} component={AdminCoursesList} />}
            {isAdmin && <Route path={r.admin.users} component={UsersList} />}

            {isTutor && <Route exact path={r.tutors.applications} component={ApplicationsList} />}
            {isTutor && <Route path={r.tutors.application} component={Application} />}
            {isTutor && <Route path={r.tutors.calendar} component={Calendar} />}

            {isStudent && (
              <Route exact path={r.student.applications} component={StudentCoursesList} />
            )}
            {isStudent && <Route path={r.student.application} component={ApplicationItem} />}

            <Redirect from={r.index} to={redirectRoute} />

            <Route component={NotFound} />
          </Switch>
        </div>
      </ErrorBoundary>
    )
  }
}

export default HomeComponent
