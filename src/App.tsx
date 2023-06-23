import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import enTranslation from "./en.json";
import thTranslation from "./th.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

import "./HomePage.css";
import Frompage from "./Frompage";
import ShowPage from "./ShowPage";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    th: { translation: thTranslation },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});


const App: React.FC = () => {
  return (
      <BrowserRouter>
        <LanguageSwitcher />
        <Routes>
          <Route path="/" element={<Frompage />} />
          <Route path="./Show" element={<ShowPage />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;
