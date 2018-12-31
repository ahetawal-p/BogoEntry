export function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}
function parseResponse(text) {
  let data = text;
  if (data) {
    try {
      data = JSON.parse(text);
    } catch (e) {
      // console.error(e);
    }
  }
  return data;
}

export function handleResponse(response) {
  return response.text().then(text => {
    const data = parseResponse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
      }

      const error =
        (data && data.error && data.error.message) ||
        response.statusText ||
        data;
      return Promise.reject(error);
    }

    return data;
  });
}
