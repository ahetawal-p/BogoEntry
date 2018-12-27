/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from './helpers';
import { RegisterView } from './components/Register';
import { LoginView } from './components/Login';
import { EventEntryView } from './components/EventEntry';
import PrivateRoute from './utils/PrivateRoute';
import * as alertActions from './actions/AlertAction';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div className="jumbotron" style={{ height: '100vh' }}>
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
            {alert.message && (
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            )}
            <Router history={history}>
              <div>
                <PrivateRoute exact path="/" component={EventEntryView} />
                <Route path="/register" component={RegisterView} />
                <Route path="/login" component={LoginView} />
              </div>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

export default connect(mapStateToProps)(App);
