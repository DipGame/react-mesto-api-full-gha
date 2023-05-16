export const BASE_URL = 'http://api.ivachev.k.f.students.nomoredomains.monster';

export const register = (userEmail, userPass) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    body: JSON.stringify({
      password: userPass,
      email: userEmail
    })
  })
    .then((res) => {
      return res+'hi';
    })
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
    body: JSON.stringify({
      password: userPass,
      email: userEmail
    })
  })
    .catch((err) => {
      console.log(err);
    })
};

export const checkToken = (token) => {
  return fetch(`api.ivachev.k.f.students.nomoredomains.monster/users/me`, {
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