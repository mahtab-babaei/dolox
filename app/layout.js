import { UserProvider } from "@/context/UserContext";
import { getToken } from "@/utils/Auth";
import { BackendURL } from "@/utils/URL";
import jwt from "jsonwebtoken";
import localFont from "next/font/local";
import Footer from "./components/global/Footer";
import Navbar from "./components/global/Navbar";
import "./globals.css";

const digirastin = localFont({
  src: "../public/fonts/digirastin.ttf",
  variable: "--font-digirastin",
});

const vazirBold = localFont({
  src: "../public/fonts/vazirbold.woff2",
  variable: "--font-vazir-bold",
});

const vazir = localFont({
  src: "../public/fonts/vazirnormal.woff2",
  variable: "--font-vazir",
});

const getUser = async () => {
  try {
    const token = await getToken(); // Use the getToken function
    if (!token) {
      return null;
    }
    const decoded = jwt.decode(token); // Decode JWT
    const userId = decoded?.user_id; // Extract user ID
    if (!userId) return null;

    // get user from server
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET", // Changed to GET for fetching user data
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(
      `${BackendURL}/accounts/users/${userId}/`,
      requestOptions
    );

    if (!response.ok) {
      console.warn(`Non-ok response status: ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export default async function RootLayout({ children }) {
  const user = await getUser();

  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${digirastin.variable} ${vazirBold.variable} ${vazir.variable} antialiased`}
      >
        <UserProvider user={user}>
          <Navbar user={user} />
          <main>{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
