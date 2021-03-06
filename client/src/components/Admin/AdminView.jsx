/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import 'react-table/react-table.css';

import * as eventActions from '../../actions/EventAction';

const DEFAULT_LIMIT = 10;
const getColumnWidth = (data, accessor, headerText) => {
  if (data) {
    const maxWidth = 400;
    const magicSpacing = 10;
    const cellLength = Math.max(
      ...data.map(row => (`${row[accessor]}` || '').length),
      headerText.length
    );
    return Math.min(maxWidth, cellLength * magicSpacing);
  }
  return 120;
};

class AdminView extends Component {
  fetchData = () => {
    const { dispatch } = this.props;
    dispatch(eventActions.getAllEvents({ limit: DEFAULT_LIMIT }));
  };

  onNext = () => {
    const { dispatch, allEvents } = this.props;
    if (allEvents && allEvents.hasNext && allEvents.next) {
      dispatch(
        eventActions.getAllEvents({
          limit: DEFAULT_LIMIT,
          next: allEvents.next
        })
      );
    }
  };

  onPrevious = () => {
    const { dispatch, allEvents } = this.props;
    if (allEvents && allEvents.hasPrevious && allEvents.previous) {
      dispatch(
        eventActions.getAllEvents({
          limit: DEFAULT_LIMIT,
          previous: allEvents.previous
        })
      );
    }
  };

  onSelectRow = rowInfo => {
    const { dispatch } = this.props;
    dispatch(eventActions.adminEditEvent(rowInfo.row._original));
  };

  getPaginateComponent = () => {
    const { allEvents } = this.props;
    const isPreviousDisabled = allEvents && allEvents.hasPrevious;
    const isNextDisabled = allEvents && allEvents.hasNext;
    const message = `Total events created: ${allEvents &&
      allEvents.totalCount}`;
    return (
      <div className="row">
        <div className="col">
          <button
            disabled={!isPreviousDisabled}
            type="button"
            className="btn btn-link"
            onClick={this.onPrevious}
          >
            PREVIOUS
          </button>
        </div>
        <div className="col">
          <small>{message}</small>
        </div>
        <div className="col">
          <button
            disabled={!isNextDisabled}
            type="button"
            className="btn btn-link float-right"
            onClick={this.onNext}
          >
            NEXT
          </button>
        </div>
      </div>
    );
  };

  render() {
    const { allEventsLoading, allEvents } = this.props;
    let data = [];
    if (allEvents && !allEventsLoading) {
      data = allEvents.results;
    }

    return (
      <div>
        <div className="row">
          <div className="col">
            <h2>Admin Portal</h2>
          </div>
          <div className="col">
            <div className="float-right">
              <Link to="/" className="btn btn-link">
                Back
              </Link>
            </div>
          </div>
        </div>

        <div>
          <ReactTable
            data={data}
            getTdProps={() => ({
              style: {
                wordWrap: 'break-word',
                whiteSpace: 'normal',
                textOverflow: 'unset'
              }
            })}
            getTrProps={(state, rowInfo) => ({
              onDoubleClick: () => this.onSelectRow(rowInfo)
            })}
            columns={[
              {
                Header: 'Title',
                accessor: 'title',
                width: getColumnWidth(data, 'title', 'Title')
              },
              { Header: 'Description', accessor: 'description', width: 200 },
              { Header: 'Activity', accessor: 'activity', width: 200 },
              { Header: 'State', accessor: 'state', width: 150 },
              { Header: 'City', accessor: 'city', width: 150 },
              { Header: 'Zip', accessor: 'zip' },
              { Header: 'Address', accessor: 'address', width: 200 },
              { Header: 'Phone', accessor: 'phone', width: 120 },
              {
                Header: 'Email',
                accessor: 'email',
                width: getColumnWidth(data, 'email', 'Email')
              },
              {
                Header: 'Website',
                accessor: 'website',
                width: getColumnWidth(data, 'website', 'Website'),
                Cell: row => (
                  <a href={row.value} target="_blank" rel="noopener noreferrer">
                    {row.value}
                  </a>
                )
              },
              {
                Header: 'Last Update Date',
                id: 'updateDate',
                width: 145,
                accessor: d => {
                  const date = new Date(d.updatedAt);
                  return date.toLocaleString();
                }
              }
            ]}
            manual
            loading={allEventsLoading}
            onFetchData={this.fetchData}
            defaultPageSize={DEFAULT_LIMIT}
            PaginationComponent={this.getPaginateComponent}
            noDataText="No events present"
            className="-striped -highlight"
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { allEventsLoading, allEvents } = state.event;
  return { allEventsLoading, allEvents };
}

export default connect(mapStateToProps)(AdminView);
