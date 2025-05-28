"use client";

import { createContext, useContext } from "react";

// Change the initial value of context to an object
export const UserContext = createContext({
  user: null,
  setUser: () => {}, 
});

// Hook to access context
export const useUser = () => {
  return useContext(UserContext);
};

// Provider to pass user and setUser to children
export const UserProvider = ({ user, setUser, children }) => { 
  return (
    <UserContext.Provider value={{ user, setUser }}> 
      {children}
    </UserContext.Provider>
  );
};