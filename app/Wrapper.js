import PrivateRoute from 'components/PrivateRoute'
import React from 'react'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import r from 'routes'
import store, { history } from 'store'
import TutorsHome from 'tutors/views/Home'
import Login from './components/Login'

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path={r.tutors.login} component={Login}/>
        <PrivateRoute path={r.tutors.index} component={TutorsHome}/>
      </Switch>
    </ConnectedRouter>
  </Provider>
)

export default hot(module)(App)
