import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from './helpers';
import { RegisterView } from './components/Register';
import { LoginView } from './components/Login';
import { EventEntryView } from './components/EventEntry';
import PrivateRoute from './utils/PrivateRoute';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <div className="jumbotron" style={{ height: '100vh' }}>
        <div className="container">
          <Router history={history}>
            <div>
              <PrivateRoute exact path="/" component={EventEntryView} />
              <Route path="/register" component={RegisterView} />
              <Route path="/login" component={LoginView} />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
