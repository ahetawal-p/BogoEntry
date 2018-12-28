import React, { Component } from 'react';
import { connect } from 'react-redux';

class AdminView extends Component {
  render() {
    return <div>Hello</div>;
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(AdminView);
