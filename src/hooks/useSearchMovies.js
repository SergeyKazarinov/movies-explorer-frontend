import { useEffect, useState } from "react";

export const useSearchMovies = (type) => {
  const [nameMovie, setNameMovie] = useState('');
  
  useEffect(() => {
    if(type === "movies")
    setNameMovie(localStorage.getItem('moviesName') || '');
  }, []);

  const handleSearch = () => {
    localStorage.setItem('moviesName', nameMovie);
  }
  
  const handleChange = (e) => {
    setNameMovie(e.target.value);
  }

  return {handleChange, handleSearch, nameMovie}
}
