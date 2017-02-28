import 'isomorphic-fetch';

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  let error = new Error(response.statusText);
  error.response = response;
  throw error;
};

const parseJson = response => response.json();

export default (url, options) => {
  return fetch(url, options)
        .then(checkStatus)
        .then(parseJson)
        .then(data => data)
        .catch(error => error)
};

export const serialize = params => {
  let str = '';
  for (let key in params) {
    str += `${key}=${params[key]}&`;
  }
  return str.substring(0, str.length - 1);
}
