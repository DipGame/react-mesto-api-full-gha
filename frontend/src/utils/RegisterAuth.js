export const BASE_URL = 'http://api.ivachev.k.f.students.nomoredomains.monster';

function lol() {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    body: JSON.stringify({
      password: '22092009',
      email: 'kostya1@yan.ru'
    })
  })
    .then((res) => {
      console.log('OK');
    })
    .catch((err) => {
      console.log(err);
    })
}

lol();

export const register = (userEmail, userPass) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    body: JSON.stringify({
      password: userPass,
      email: userEmail
    })
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    })
};

function checkResponse() {
  return (response) => {
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(new Error('Что-то пошло не так....'))
  }
}

export const authorize = (userEmail, userPass) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    body: JSON.stringify({
      password: userPass,
      email: userEmail
    })
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    })
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(data => data)
    .catch((err) => {
      console.log(err);
    })
}