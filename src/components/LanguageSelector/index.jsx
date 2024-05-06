"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./languageSelector.module.scss";
import { LANGUAGES } from "@/constants";
import { LanguageContext } from "@/context/LanguageProvider";

// The language selector now uses the language context
const LanguageSelector = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const { selectedLanguage, handleChange } = useContext(LanguageContext);

  // Prevent the language selector from rendering on the server
  if (!mounted) return <></>;

  return (
    <div className={styles.languageSelector}>
      <select onChange={handleChange} value={selectedLanguage.code}>
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang[selectedLanguage.code]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
