/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EventEntryForm from './EventEntryForm';
import * as userActions from '../../actions/UserAction';

class EventEntryView extends Component {
  onCreateEvent = values => {
    console.log(values);
    const { dispatch } = this.props;
    dispatch(userActions.register(values));
  };

  onLogout = () => {
    const { dispatch } = this.props;
    dispatch(userActions.logout());
  };

  render() {
    const { loggingIn, user } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col">
            <h2>Event Entry Form</h2>
          </div>
          <div className="col">
            <div className="float-right">
              <button
                type="button"
                className="btn btn-link"
                onClick={this.onLogout}
              >
                Logout
              </button>
              {user.isAdmin && (
                <Link to="/admin" className="btn btn-outline-danger">
                  Admin
                </Link>
              )}
            </div>
          </div>
        </div>
        {loggingIn && (
          <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
        )}
        <EventEntryForm onSubmit={this.onCreateEvent} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn, user } = state.user;
  return { loggingIn, user };
}
export default connect(mapStateToProps)(EventEntryView);
