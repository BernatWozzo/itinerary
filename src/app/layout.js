import React from "react";
import PropTypes from "prop-types";
import "./globals.scss";
import { Inter } from "next/font/google";
import LanguageProvider from "@/context/LanguageProvider";
import LanguageSelector from "@/components/LanguageSelector";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Itinerary",
  description:
    "Itinerary web app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <LanguageProvider>
        <LanguageSelector />
        <body className={inter.className}>{children}</body>
      </LanguageProvider>
    </html>
  );
}
RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
