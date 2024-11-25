import { UserProvider } from "@/context/UserContext";
import { getUser } from "@/utils/Request";
import jwt from "jsonwebtoken";
import localFont from "next/font/local";
import { getToken } from "@/utils/Auth";
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

const fetchUserFromServer = async () => {
  try {
    const token = await getToken(); // Use the getToken function
    if (!token) {
      return null;
    }
    const decoded = jwt.decode(token); // Decode JWT
    const userId = decoded?.user_id; // Extract user ID
    if (!userId) return null;

    // Use getUser function
    const user = await getUser(token, userId);
    return user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export default async function RootLayout({ children }) {
  const user = await fetchUserFromServer();

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
