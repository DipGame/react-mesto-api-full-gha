export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (userEmail, userPass) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: userPass,
      email: userEmail
    })
  })
    .then((res) => {
      return res;
    })  
    .then(checkResponse())
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
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: userPass,
      email: userEmail
    })
  })
  .then(checkResponse())
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
    .then(checkResponse())
}