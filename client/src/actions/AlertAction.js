import * as alertTypes from './AlertTypes';

export function success(message) {
  return { type: alertTypes.SUCCESS, message };
}

export function error(message) {
  return { type: alertTypes.ERROR, message };
}

export function clear() {
  return { type: alertTypes.CLEAR };
}
