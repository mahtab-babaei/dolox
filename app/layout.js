import { UserProvider } from "@/context/UserContext";
import { getUser } from "@/utils/Requests";
import localFont from "next/font/local";
import Footer from "./components/global/Footer";
import Navbar from "./components/global/Navbar";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "react-hot-toast";

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

export default async function RootLayout({ children }) {
  const user = await getUser();

  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${digirastin.variable} ${vazirBold.variable} ${vazir.variable} antialiased`}
      >
        <UserProvider user={user}>
          <Navbar user={user} />
          <main>
            <Toaster
              toastOptions={{
                style: {
                  fontFamily: "vazir", 
                  fontSize: "16px", 
                },
              }}
              position="bottom-left"
              reverseOrder={false}
            />
            {children}
          </main>
          <Footer />
        </UserProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
