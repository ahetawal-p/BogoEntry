import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventEntryForm from './EventEntryForm';

function mapStateToProps(state) {
  return {};
}

class EventEntryView extends Component {
  onCreateEvent = values => {
    console.log(values);
  };

  render() {
    return (
      <div style={{ padding: 15 }}>
        <h2>Event Entry Form</h2>
        <EventEntryForm onSubmit={this.onCreateEvent} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(EventEntryView);
