import { useState } from "react";

const useOpenBurger = (initialValue: boolean) => {
  const [isButtonMenu, setIsButtonMenu] = useState(initialValue);

  const handleMenuClick = () => {
    setIsButtonMenu(state => !state);
  }

  return {handleMenuClick, isButtonMenu};
}

export default useOpenBurger;