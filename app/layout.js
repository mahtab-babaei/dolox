"use client";
import { getUser } from "@/utils/Request";
import jwt from "jsonwebtoken";
import localFont from "next/font/local";
import nookies from "nookies";
import React, { useEffect, useState } from "react";
import Footer from "./components/global/Footer";
import Navbar from "./components/global/Navbar";
import "./globals.css";

const digirastin = localFont({
  src: "./fonts/digirastin.ttf",
  variable: "--font-digirastin",
});

const vazirBold = localFont({
  src: "./fonts/vazirbold.woff2",
  variable: "--font-vazir-bold",
});

const vazir = localFont({
  src: "./fonts/vazirnormal.woff2",
  variable: "--font-vazir",
});

export default function RootLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const cookies = nookies.get(); // Get cookies
      const token = cookies.access; // Access token from cookies

      if (token) {
        setIsAuthenticated(true);

        // try {
        const decoded = jwt.decode(token); // Decode the JWT
        const userId = decoded.user_id; // Get user ID from token

        // Fetch user data asynchronously
        const userInfo = await getUser(token, userId);
        setUser(userInfo);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${digirastin.variable} ${vazirBold.variable} ${vazir.variable} antialiased`}
      >
        <Navbar user={user} />
        <main>
          {React.Children.map(children, (child) =>
            React.cloneElement(child, { user })
          )}
        </main>
        <Footer />
      </body>
    </html>
  );
}
