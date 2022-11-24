import { useState } from "react";

const useOpenPopup = () => {
  const [isError, setIsError] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState('')

  const handleOpenPopup = (message, boolean) => {
    setIsError(boolean)
    setIsOpen(true);
    setInfoMessage(message);
    document.addEventListener("keydown", handleEscClose);
  }

  const handleClosePopup = () => {
    document.removeEventListener("keydown", handleEscClose);
    setIsOpen(false);
    setTimeout(() => {
      setInfoMessage('');
    }, "500");
  }

  const handleCLoseOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClosePopup();
    }
  }

  function handleEscClose(e) {
    e.key === "Escape" && handleClosePopup();
  }

  return {handleOpenPopup, handleClosePopup, handleCLoseOverlayClick, isOpen, infoMessage, isError};
}

export default useOpenPopup;