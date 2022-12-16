import { IError } from "../interface/IError";
import { IMoviesFromServer, ISavedMovies } from "../interface/IMovies";
import { ILogin, IProfile, IRegister, IUser } from "../interface/IUser";
import { BASE_URL_FOR_MAIN_API, BASE_URL_FOR_MOVIE_IMAGES, JWT } from "./constants";

const checkAnswer = (res: any) => {
  if(res.ok) {
    return res.json();
  }
  
  return res.json().then((err: IError) => {
    err.statusCode = res.status;
    return Promise.reject(err);
  })
}

export const register = async ({name, email, password}: IRegister): Promise<IUser> => {
  try{
    const res = await fetch(`${BASE_URL_FOR_MAIN_API}/signup`, {
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

export const login = async ({ email, password }: ILogin): Promise<{token: string}> => {
  try {
    const res = await fetch(`${BASE_URL_FOR_MAIN_API}/signin`, {
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

export const getUser = async (token: string | null): Promise<IUser> => {
  try {
    const res = await fetch(`${BASE_URL_FOR_MAIN_API}/users/me`, {
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

export const updateUser = async ({name, email}: IProfile): Promise<IUser> => {
  try {
    const res = await fetch(`${BASE_URL_FOR_MAIN_API}/users/me`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem(JWT)}`
      },
      body: JSON.stringify({name, email})
    });

    const data = checkAnswer(res);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const getSavedMovies = async (): Promise<ISavedMovies[]> => {
  try {
    const res = await fetch(`${BASE_URL_FOR_MAIN_API}/movies`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem(JWT)}`
      }
    })

    const data = await checkAnswer(res);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const createMovies = async (movie: IMoviesFromServer): Promise<ISavedMovies> => {
  try {
    const res = await fetch(`${BASE_URL_FOR_MAIN_API}/movies`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem(JWT)}`
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: BASE_URL_FOR_MOVIE_IMAGES + movie.image.url,
        trailerLink: movie.trailerLink,
        thumbnail: BASE_URL_FOR_MOVIE_IMAGES + movie.image.formats.thumbnail.url,
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

export const deleteMovie = async (movie: ISavedMovies): Promise<ISavedMovies> => {
  try {
    const res = await fetch(`${BASE_URL_FOR_MAIN_API}/movies/${movie._id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem(JWT)}`
      }
    })

    const data = await checkAnswer(res);
    return data;

  } catch (error) {
    return Promise.reject(error)
  }
}