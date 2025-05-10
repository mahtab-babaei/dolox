"use client";

import { useEffect, useState } from "react";
import { UserProvider } from "@/context/UserContext";
import { getUser } from "@/utils/Requests"; 

export default function UserProviderWrapper({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser().then(setUser);
  }, []);

  return <UserProvider user={user}>{children}</UserProvider>;
}
