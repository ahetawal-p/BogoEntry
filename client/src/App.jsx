import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from './helpers';
import { RegisterPage } from './components';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <div className="jumbotron">
        <div className="container">
          <Router history={history}>
            <div>
              <Route path="/" component={RegisterPage} />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
