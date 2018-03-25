import { CoursesList, UsersList } from 'admin/views'
import {
  ErrorBoundary,
  Header,
  NotFound,
  PassportControl
} from 'common/components'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { NavLink, Route, Switch } from 'react-router-dom'
import r from 'routes'
import { Application, ApplicationsList } from 'tutors' // todo: convert to tutors/view

@connect(state => ({
  auth: state.auth
}))
class HomeComponent extends React.Component {
  static propTypes = {
    auth: PropTypes.object
  }

  render() {
    const { auth: { roles } } = this.props
    const visibleToAdmin = roles['admin']
    const visibleToStudent = roles['student']
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
            {visibleToAdmin && (
              <>
                <Route path={r.courses} component={CoursesList} />
                <Route path={r.users} component={UsersList} />
              </>
            )}

            {visibleToTutor && (
              <>
                <Route
                  exact
                  path={r.applications}
                  component={ApplicationsList}
                />
                <Route path={r.application} component={Application} />
              </>
            )}

            <Route component={NotFound} />
          </Switch>
        </div>
      </ErrorBoundary>
    )
  }
}

export default HomeComponent
