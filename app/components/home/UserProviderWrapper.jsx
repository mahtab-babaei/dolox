"use client";

import { useEffect, useState } from "react";
import { UserProvider } from "@/context/UserContext";
import { getUser } from "@/utils/Requests";

export default function UserProviderWrapper({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser().then((userData) => setUser(userData));
  }, []);

  return (
    <UserProvider user={user} setUser={setUser}>
      {children}
    </UserProvider>
  );
}
