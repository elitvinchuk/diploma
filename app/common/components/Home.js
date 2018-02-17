import { ErrorBoundary, Header, NotFound } from 'common/components'
import React from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'
import r from 'routes'
import routes from 'routes'
import { Application, ApplicationsList } from 'tutors'

const Home = () => (
  <ErrorBoundary>
    <Header>
      <NavLink to={routes.applications} className="nav-item nav-link">
        Обращения
      </NavLink>
      <NavLink to={routes.calendar} className="nav-item nav-link">
        Календарь
      </NavLink>
      {false && (
        <NavLink to={routes.users} className="nav-item nav-link">
          Пользователи
        </NavLink>
      )}
    </Header>

    <div className="container">
      <Switch>
        <Route exact path={r.applications} component={ApplicationsList} />
        <Route path={r.application} component={Application} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </ErrorBoundary>
)

export default Home
