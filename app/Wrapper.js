import { Home, Login, PrivateRoute } from 'common/components'
import { actions } from 'common/redux/auth'
import React from 'react'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import r from 'routes'
import store, { history } from 'store'
import 'common/styles'

store.dispatch(actions.listenToAuthChanges())

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path={r.login} component={Login} />
        <PrivateRoute path={r.index} component={Home} />
      </Switch>
    </ConnectedRouter>
  </Provider>
)

export default hot(module)(App)
