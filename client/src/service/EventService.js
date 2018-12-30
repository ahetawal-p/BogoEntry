import * as helper from '../utils/ServiceUtil';
import { authHeader } from '../helpers';

export function createEvent(event) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(event)
  };

  return fetch('/event', requestOptions).then(helper.handleResponse);
}

export function getEventCount() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch('/event', requestOptions).then(helper.handleResponse);
}

export function updateEvent(event) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event)
  };

  return fetch('/event/:id', requestOptions).then(helper.handleResponse);
}
