"use client";

import { createContext, useContext } from "react";

// Create Context for user
const UserContext = createContext(null);

// Hook to access the user
export const useUser = () => {
  return useContext(UserContext);
};

// Provider to pass user to child components
export const UserProvider = ({ user, children }) => {
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};
