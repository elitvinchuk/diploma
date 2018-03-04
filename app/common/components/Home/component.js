// @flow

import UsersList from 'admin/components/UsersList'
import { ErrorBoundary, Header, NotFound } from 'common/components'
import React from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'
import routes from 'routes'
import { Application, ApplicationsList } from 'tutors'

type authProps = {
  displayName: string,
  email: string,
  photoURL: string,
  roles: string[]
}

// todo: wrap navlinks and routes with roles separation wrapper
// todo: fix errorBoundary
// todo: fix types

const Home = ({ auth: { roles } }: authProps) => (
  <ErrorBoundary>
    <Header>
      {roles.includes('tutor') && (
        <NavLink to={routes.applications} className="nav-item nav-link">
          Обращения
        </NavLink>
      )}
      {roles.includes('tutor') && (
        <NavLink to={routes.calendar} className="nav-item nav-link">
          Календарь
        </NavLink>
      )}
      {roles.includes('admin') && (
        <NavLink to={routes.users} className="nav-item nav-link">
          Пользователи
        </NavLink>
      )}
    </Header>

    <div className="container">
      <Switch>
        <Route exact path={routes.applications} component={ApplicationsList} />
        <Route path={routes.application} component={Application} />

        <Route path={routes.users} component={UsersList} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </ErrorBoundary>
)

export default Home
