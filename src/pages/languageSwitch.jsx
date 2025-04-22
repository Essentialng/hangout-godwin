import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
     const { t } = useTranslation();
  const { i18n } = useTranslation();

  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng).then(() => {
      console.log("Language changed to:", i18n.language);
    });
  };

  return (
    <div style={{ marginTop: 10 }} className='p-20'>
      <button onClick={() => changeLanguage('en')}>🇬🇧 English</button>
      <button onClick={() => changeLanguage('fr')}>🇫🇷 French</button>

      <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-snug">
        {t("home.heading")} <span className="text-orange-500 text-7xl md:text-8xl font-black italic tracking-wide">e</span>, {t("home.subheading")}
      </h2>
      <p className="mt-4 text-lg md:text-xl text-gray-500 max-w-3xl mx-auto">
        {t("home.description")}
      </p>
    </div>
  );
};

export default LanguageSwitcher;
