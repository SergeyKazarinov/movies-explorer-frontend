import { ChangeEvent, useEffect, useState } from "react";
import { MOVIES_NAME } from "../utils/constants";

export const useSearchMovies = (type?: string) => {
  const [nameMovie, setNameMovie] = useState('');
  
  useEffect(() => {
    if(type === "movies")
    setNameMovie(sessionStorage.getItem(MOVIES_NAME) || '');
  }, []);

  const handleSetItem = () => {
    sessionStorage.setItem(MOVIES_NAME, nameMovie);
  }
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameMovie(e.target.value);
  }

  return {handleChange, handleSetItem, nameMovie}
}
