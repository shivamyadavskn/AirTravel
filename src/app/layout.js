// import { Inter, Rubik, Roboto } from "@next/font/google";
// import clsx from "clsx";

// export const title = Roboto({
//   subsets: ["latin"],
//   weight: ["100", "300", "400", "700"],
// });

// export const text = Inter({
//   subsets: ["latin"],
//   weight: ["400", "700"],
// });
import "./globals.css";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flight Booking",
  description: "Flight Booking",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
