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
import { Application, ApplicationsList, Calendar } from 'tutor' // todo: convert to tutors/view
import { StudentCoursesList } from 'student/views'

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
    dispatch(usersActions.getUsers())
  }

  render() {
    const { user } = this.props

    if (!user) {
      return <Loader fullscreen />
    }

    const visibleToAdmin = user.roles['admin']
    const visibleToStudent = user.roles['student']
    const visibleToTutor = user.roles['tutor']

    // todo: LOW consider moving to cdu
    const redirectRoute = visibleToAdmin
      ? r.admin.courses
      : visibleToTutor ? r.courses : r.student.courses

    return (
      <ErrorBoundary>
        <Header user={user}>
          {visibleToAdmin && (
            <>
              <NavLink to={r.admin.courses} className="nav-item nav-link">
                Предметы
              </NavLink>
              <NavLink to={r.admin.users} className="nav-item nav-link">
                Пользователи
              </NavLink>
            </>
          )}
          {visibleToTutor && (
            <>
              <NavLink to={r.applications} className="nav-item nav-link">
                Обращения
              </NavLink>
              <NavLink to={r.calendar} className="nav-item nav-link">
                Календарь
              </NavLink>
            </>
          )}
          {visibleToStudent && (
            <NavLink to={r.student.courses} className="nav-item nav-link">
              Предметы
            </NavLink>
          )}
        </Header>

        <div className="container">
          <Switch>
            {visibleToAdmin && <Route path={r.admin.courses} component={AdminCoursesList} />}
            {visibleToAdmin && <Route path={r.admin.users} component={UsersList} />}

            {visibleToTutor && <Route exact path={r.applications} component={ApplicationsList} />}
            {visibleToTutor && <Route path={r.application} component={Application} />}
            {visibleToTutor && <Route path={r.calendar} component={Calendar} />}

            {visibleToStudent && <Route path={r.student.courses} component={StudentCoursesList} />}

            <Redirect from={r.index} to={redirectRoute} />

            <Route component={NotFound} />
          </Switch>
        </div>
      </ErrorBoundary>
    )
  }
}

export default HomeComponent
