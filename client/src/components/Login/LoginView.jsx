import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';

function mapStateToProps(state) {
  return {};
}

class LoginView extends Component {
  onLogin = values => {
    console.log(values);
  };

  render() {
    return (
      <div style={{ padding: 15 }}>
        <h2>Login Form</h2>
        <LoginForm onSubmit={this.onLogin} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(LoginView);
