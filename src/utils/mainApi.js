const BASE_URL = 'http://localhost:5000';

const HEADERS_OBJECT = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('jwt')}`
}

const checkAnswer = (res) => {
  if(res.ok) {
    return res.json();
  }
  
  return res.json().then((err) => {
    err.statusCode = res.status;
    return Promise.reject(err);
  })
}

export const register = async ({name, email, password}) => {
  try{
    const res = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: HEADERS_OBJECT,
      body: JSON.stringify({ name, email, password })
    });
    const data = await checkAnswer(res);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }

}

export const login = async ({ email, password }) => {
  try {
    const res = await fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: HEADERS_OBJECT,
      body: JSON.stringify({ email, password })
    })

    const data = await checkAnswer(res);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const getUser = async () => {
  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: HEADERS_OBJECT
    })

    const data = await checkAnswer(res);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}