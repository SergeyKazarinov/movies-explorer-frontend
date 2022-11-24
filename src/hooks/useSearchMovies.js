import { useEffect, useState } from "react";

export const useSearchMovies = (type) => {
  const [nameMovie, setNameMovie] = useState('');
  
  useEffect(() => {
    if(type === "movies")
    setNameMovie(sessionStorage.getItem('moviesName') || '');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    sessionStorage.setItem('moviesName', nameMovie);
  }
  
  const handleChange = (e) => {
    setNameMovie(e.target.value);
  }

  return {handleChange, handleSearch, nameMovie}
}
