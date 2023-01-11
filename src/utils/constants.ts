export const NOT_MOVIES_SEARCH_MESSAGE: string = `Ничего не найдено! 😔`;
export const NOT_SAVED_MOVIES_MESSAGE: string = 'У вас нет сохраненных фильмов!';
export const MOVIES_SERVER_ERROR_MESSAGE: string = "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз";
export const REGISTER_ERROR_MESSAGE: string = "При регистрации пользователя произошла ошибка.";
export const USER_UPDATE_MESSAGE: string = "Данные успешно обновлены!";
export const USER_UPDATE_ERROR_MESSAGE: string = "При обновлении профиля произошла ошибка.";
export const URLS_FOR_PAGE_NOTE_FOUND: string[] = ['/', '/movies', '/saved-movies', '/profile', 'signin', 'signup']
export const URLS_FOR_HEADER: string[] = ['/', '/movies', '/saved-movies', '/profile', '/movies/:id'];
export const URLS_FOR_FOOTER: string[] = ['/', '/movies', '/saved-movies', '/movies/:id'];
export const URLS_FOR_AUTHORIZATION: string[] = ['/signin', '/signup'];
export const LARGE_WINDOW_SIZE: number = 790;
export const MIDDLE_WiNDOW_SIZE: number = 450;
export const MORE_BUTTON_LARGE: number = 3;
export const MORE_BUTTON_MIDDLE: number = 2;
export const LARGE_COUNT: number = 12;
export const MIDDLE_COUNT: number = 8;
export const SMALL_COUNT: number = 5;
export const MOVIE_SHORT_DURATION: number = 40;
export const JWT: string = 'jwt';
export const MOVIES_NAME: string = 'moviesName';
export const CHECKBOX: string = 'checkbox';
export const ERROR_INPUT_SEARCH_MOVIES_MESSAGE: string = "Нужно ввести ключевое слово";
export const EMAIL_PATTERN: string = '^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$';


// export const BASE_URL_FOR_MAIN_API: string = 'http://localhost:5000';
export const BASE_URL_FOR_MAIN_API: string = 'https://api.movies.kazarinov.nomoredomains.icu';
export const BASE_URL_FOR_MOVIE_IMAGES: string = 'https://api.nomoreparties.co';
export const BASE_URL_FOR_MOVIES: string = 'https://api.nomoreparties.co/beatfilm-movies';


export const STACKS: string[] = [
  'HTML',
  'CSS',
  'Sass',
  'JS',
  'TS',
  'React',
  'Git',
  'Express.js',
  'mongoDB',
  'Redux',
  'Redux Toolkit'
]