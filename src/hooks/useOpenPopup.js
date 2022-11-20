import React, { useState } from "react";

const useOpenPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  const handleOpenPopup = (message) => {
    setIsOpen(true);
    setErrorMessage(message);
    document.addEventListener("keydown", handleEscClose);
  }

  const handleClosePopup = () => {
    document.removeEventListener("keydown", handleEscClose);
    setIsOpen(false);
    setTimeout(() => {
      setErrorMessage('');
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

  return {handleOpenPopup, handleClosePopup, handleCLoseOverlayClick, isOpen, errorMessage};
}

export default useOpenPopup;