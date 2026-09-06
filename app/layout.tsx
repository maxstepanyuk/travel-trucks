import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";

import "modern-normalize/modern-normalize.css";
import "./globals.css";
// swiper
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import Heder from "@/components/Header/Header";
import TanStackProvider from "@/components/providers/TanStackProvider/TanStackProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-family", // todo: rename
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const manrope = Manrope({
  variable: "--second-family", // todo: rename
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "TravelTrucks",
  description:
    "Campers of your dreams - You can find everything you want in our catalog",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <TanStackProvider>
          <Heder />
          {children}
        </TanStackProvider>
        <Toaster />
      </body>
    </html>
  );
}
