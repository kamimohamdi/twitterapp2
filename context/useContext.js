"use client";
import { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [profile, setProfile] = useState(false);

  const profileHandler = () => {
    setProfile(!profile);
  };

  return (
    <StateContext.Provider value={{ profile, profileHandler }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
