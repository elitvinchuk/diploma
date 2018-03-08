import UsersList from 'admin/components/UsersList'
import { ErrorBoundary, Header, NotFound, PrivateLink } from 'common/components'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import routes from 'routes'
import { Application, ApplicationsList } from 'tutors'

// todo: wrap routes with roles separation wrapper
// todo: fix errorBoundary

const Home = () => (
  <ErrorBoundary>
    <Header>
      <PrivateLink to={routes.applications} role="tutor" label="Обращения" />
      <PrivateLink to={routes.calendar} role="tutor" label="Календарь" />
      <PrivateLink to={routes.users} role="admin" label="Пользователи" />
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
