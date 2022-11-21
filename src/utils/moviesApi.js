const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

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
    const res = await fetch(BASE_URL, {
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