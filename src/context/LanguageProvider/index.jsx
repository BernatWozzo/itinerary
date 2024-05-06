"use client";
import { LANGUAGES, SPANISH } from "@/constants";
import propTypes from "prop-types";
import React, { createContext, useState } from "react";

// Create a new context for the language
export const LanguageContext = createContext();

// Create a context provider component
const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(SPANISH);

  const handleChange = (event) => {
    const language = LANGUAGES.find((lang) => lang.code === event.target.value);
    setSelectedLanguage(language);
  };

  // The context value is now an object that contains both the selected language
  // and the function to change it
  const value = { selectedLanguage, handleChange };

  // The provider is wrapped around the children components
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default LanguageProvider;
