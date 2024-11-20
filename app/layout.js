import { UserProvider } from "@/context/UserContext";
import { getUser } from "@/utils/Request";
import jwt from "jsonwebtoken";
import localFont from "next/font/local";
import { cookies } from "next/headers";
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

const fetchUserFromServer = async (token) => {
  try {
    const decoded = jwt.decode(token); // Decode JWT
    const userId = decoded?.user_id; // Extract user ID
    if (!userId) throw new Error("Invalid token");

    // Use getUser function
    const user = await getUser(token, userId);
    return user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access")?.value;

  // Fetch user data using the token
  const user = token ? await fetchUserFromServer(token) : null;

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
