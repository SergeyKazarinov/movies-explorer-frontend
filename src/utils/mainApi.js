const BASE_URL = 'http://localhost:5000';
const imageUrl = 'https://api.nomoreparties.co';

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
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
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
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const data = await checkAnswer(res);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const getUser = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    const data = await checkAnswer(res);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const updateUser = async ({name, email}) => {
  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({name, email})
    });

    const data = checkAnswer(res);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const getSavedMovies = async () => {
  try {
    const res = await fetch(`${BASE_URL}/movies`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    })

    const data = await checkAnswer(res);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const createMovies = async (movie) => {
  try {
    const res = await fetch(`${BASE_URL}/movies`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: imageUrl + movie.image.url,
        trailerLink: movie.trailerLink,
        thumbnail: imageUrl + movie.image.formats.thumbnail.url,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      })
    })

    const data = await checkAnswer(res);
    return data;
  } catch (error) {
    console.log(error)
    return Promise.reject(error)
  }
}

export const deleteMovie = async (movie) => {
  try {
    const res = await fetch(`${BASE_URL}/movies/${movie._id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    })

    const data = await checkAnswer(res);
    return data;

  } catch (error) {
    return Promise.reject(error)
  }
}