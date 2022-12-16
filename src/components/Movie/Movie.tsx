import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieData from './MoviesData/MoviesData';
import PageNotFound from '../PageNotFound/PageNotFound';
import LoaderPage from '../UI/LoaderPage/LoaderPage'
import { useAppSelector } from '../../hooks/useTypedSelector';



const Movie: FC = () => {
  const [loader, setLoader] = useState(true);
  const { id } = useParams<{id: string}>();
  const { moviesFromServer } = useAppSelector(state => state.movies);

  useEffect(() => {
    setLoader(true);
    if (moviesFromServer.length !== 0) {
      setLoader(false);
    }
  }, [moviesFromServer]);

  const movie = moviesFromServer.find(item => item.id === Number(id));

  return(
    loader
    ? <LoaderPage />
    : !movie
    ? <PageNotFound />
    : <MovieData movie={movie} />
  )
}

export default Movie;