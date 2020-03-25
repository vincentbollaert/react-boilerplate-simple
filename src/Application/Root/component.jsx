import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'

import Application from '../component'
import reducers from './reducers'

class Root extends React.Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    const reducer = reducers
    const history = createBrowserHistory()
    const store = createStore(
      reducer,
      undefined,
      compose(
        applyMiddleware(
          routerMiddleware(history),
        ),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )
    )

    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route
              path="/"
              render={props => <Application {...props} />}
            />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default Root
