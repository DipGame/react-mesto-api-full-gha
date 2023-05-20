export const BASE_URL = 'https://api.ivachev.k.f.students.nomoredomains.monster';

export const register = (userEmail, userPass) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: userPass,
      email: userEmail
    })
  })
    .then(response => response.json())
    .catch(checkResponse())
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
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: userPass,
      email: userEmail
    })
  })
    .then(response => response.json())
    .catch(checkResponse())
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(response => response.json())
    .catch((err) => {
      console.log(err);
    })
}