import * as helper from '../utils/ServiceUtil';

export function logout() {
  // remove user from local storage to log user out
  helper.logout();
}

export function login(values) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values)
  };

  // return new Promise((resolve, reject) => {
  //   resolve('success');
  // });
  return fetch('/user/login', requestOptions)
    .then(helper.handleResponse)
    .then(user => {
      // login successful if there's a jwt token in the response
      if (user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
      }

      return user;
    });
}

export function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return fetch('/user/register', requestOptions).then(helper.handleResponse);
}
