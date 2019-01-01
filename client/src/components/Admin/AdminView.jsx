/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as eventActions from '../../actions/EventAction';

class AdminView extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(eventActions.getAllEvents({ limit: 3 }));
  }

  onNext = () => {
    const { dispatch, allEvents } = this.props;
    if (allEvents.hasNext && allEvents.next) {
      dispatch(eventActions.getAllEvents({ limit: 3, next: allEvents.next }));
    }
  };

  onPrevious = () => {
    const { dispatch, allEvents } = this.props;
    if (allEvents.hasPrevious && allEvents.previous) {
      dispatch(
        eventActions.getAllEvents({
          limit: 3,
          previous: allEvents.previous
        })
      );
    }
  };

  render() {
    return (
      <div>
        <div className="row">
          <button
            type="button"
            className="btn btn-link"
            onClick={this.onPrevious}
          >
            PREVIOUS
          </button>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={this.onNext}
          >
            NEXT
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { allEventsLoading, allEvents } = state.event;
  console.log(allEventsLoading);
  return { allEventsLoading, allEvents };
}

export default connect(mapStateToProps)(AdminView);
