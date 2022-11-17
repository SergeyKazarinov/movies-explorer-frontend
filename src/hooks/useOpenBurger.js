import { useState } from "react";

const useOpenBurger = (initialValue) => {
  const [isButtonMenu, setIsButtonMenu] = useState(initialValue);
  console.log(isButtonMenu)

  const handleMenuClick = () => {
    setIsButtonMenu(state => !state);
  }

  return {handleMenuClick, isButtonMenu};
}

export default useOpenBurger;