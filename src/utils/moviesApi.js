import { BASE_URL_FOR_MOVIES } from "./constants";

const checkAnswer = (res) => {
  if(res.ok) {
    return res.json();
  }
  
  return res.json().then((err) => {
    err.statusCode = res.status;
    return Promise.reject(err);
  })
}

export const getMovies = async () => {
  try {
    const res = await fetch(BASE_URL_FOR_MOVIES, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await checkAnswer(res);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }



}