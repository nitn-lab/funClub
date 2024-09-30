import React, { createContext, useState, useContext } from "react";

// Create the context
const SignOutContext = createContext();

// Create a provider component
export const SignOutProvider = ({ children }) => {
  const [isSignOutPopupOpen, setIsSignOutPopupOpen] = useState(false);

  const openSignOutPopup = () => setIsSignOutPopupOpen(true);
  const closeSignOutPopup = () => setIsSignOutPopupOpen(false);

  return (
    <SignOutContext.Provider value={{ isSignOutPopupOpen, openSignOutPopup, closeSignOutPopup }}>
      {children}
    </SignOutContext.Provider>
  );
};

// Create a custom hook to use the context
export const useSignOut = () => useContext(SignOutContext);