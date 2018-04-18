import { actions as coursesActions } from 'admin/redux/courses'
import { actions as usersActions } from 'admin/redux/users'
import { ErrorBoundary, Header, NotFound } from 'common/components'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { NavLink, Route, Switch } from 'react-router-dom'
import r from 'routes'
import { Application, ApplicationsList, Calendar } from 'tutors' // todo: convert to tutors/view
import AdminView from 'admin/views'

@connect(state => ({
  auth: state.auth
}))
class HomeComponent extends React.Component {
  static propTypes = {
    auth: PropTypes.object,
    dispatch: PropTypes.func
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(coursesActions.getCourses())
    dispatch(usersActions.getUsers())
  }

  render() {
    const { auth: { roles } } = this.props
    const visibleToAdmin = roles['admin']
    // const visibleToStudent = roles['student']
    const visibleToTutor = roles['tutor']

    return (
      <ErrorBoundary>
        <Header>
          {visibleToAdmin && (
            <>
              <NavLink to={r.courses} className="nav-item nav-link">
                Предметы
              </NavLink>
              <NavLink to={r.users} className="nav-item nav-link">
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
        </Header>

        <div className="container">
          <Switch>
            {visibleToAdmin && <AdminView />}

            {visibleToTutor && <Route exact path={r.applications} component={ApplicationsList} />}
            {visibleToTutor && <Route path={r.application} component={Application} />}
            {visibleToTutor && <Route path={r.calendar} component={Calendar} />}

            <Route component={NotFound} />
          </Switch>
        </div>
      </ErrorBoundary>
    )
  }
}

export default HomeComponent
