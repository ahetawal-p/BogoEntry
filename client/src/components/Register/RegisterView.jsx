/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import RegisterForm from './RegisterForm';

function mapStateToProps(state) {
  return {};
}

class RegisterView extends Component {
  showResults = values => {
    console.log(values);
  };

  render() {
    return (
      <div style={{ padding: 15 }}>
        <h2>Register Form</h2>
        <RegisterForm onSubmit={this.showResults} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(RegisterView);
