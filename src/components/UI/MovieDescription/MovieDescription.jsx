import s from './MoviesDescription.module.scss';

const MovieDescription = ({title, subtitle}) => {
  return(
    <div className={s.movieDescription}>
      <h3 className={s.movieDescription__title}>{title}</h3>
      <p className={s.movieDescription__subtitle}>{subtitle}</p>
    </div>
  )
}

export default MovieDescription;