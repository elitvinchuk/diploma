import { CoursesList, UsersList } from 'admin/views'
import { ErrorBoundary, Header, NotFound, PrivateLink } from 'common/components'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import r from 'routes'
import { Application, ApplicationsList } from 'tutors'

// todo: create auth role wrapper to <| show/hide components |>
// todo: fix errorBoundary

const Home = () => (
  <ErrorBoundary>
    <Header>
      <PrivateLink to={r.applications} role="tutor" label="Обращения" />
      <PrivateLink to={r.calendar} role="tutor" label="Календарь" />

      <PrivateLink to={r.courses} role="admin" label="Предметы" />
      <PrivateLink to={r.users} role="admin" label="Пользователи" />
    </Header>

    <div className="container">
      <Switch>
        <Route exact path={r.applications} component={ApplicationsList} />
        <Route path={r.application} component={Application} />

        <Route path={r.courses} component={CoursesList} />
        <Route path={r.users} component={UsersList} />

        <Route component={NotFound} />
      </Switch>
    </div>
  </ErrorBoundary>
)

export default Home
