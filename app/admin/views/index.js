import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import r from 'routes'
import CoursesList from './CoursesList'
import UsersList from './UsersList'

const AdminView = () => (
  <Switch>
    <Route path={r.courses} component={CoursesList} />
    <Route path={r.users} component={UsersList} />
    <Redirect from={r.index} to={r.users} />
  </Switch>
)

export default AdminView
