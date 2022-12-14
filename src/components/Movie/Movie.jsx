import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MovieData from './MoviesData/MoviesData';
import PageNotFound from '../PageNotFound/PageNotFound';
import LoaderPage from '../UI/LoaderPage/LoaderPage'



const Movie = ({}) => {
  const [loader, setLoader] = useState(true);
  const { id } = useParams();
  const { moviesFromServer } = useSelector(state => state.movies);

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
    : !moviesFromServer.some(item => item.id === Number(id))
    ? <PageNotFound />
    : <MovieData movie={movie} />
  )
}

export default Movie;