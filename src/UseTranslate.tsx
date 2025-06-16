import { useState, useEffect } from "react";
import { translateText } from "./Translate";
import { useLanguage } from "./components/LanguageContext";

export const useTranslate = (text, translations = []) => {
  const { selectedLanguage } = useLanguage();
  const [translatedText, setTranslatedText] = useState(text);

  useEffect(() => {
    const translate = async () => {
      const translationObject = translations.find(
        (t) => t[selectedLanguage.code]
      );

      if (translationObject) {
        setTranslatedText(translationObject[selectedLanguage.code]);
      } else {
        const translated = await translateText(text, selectedLanguage.code);
        setTranslatedText(translated);
      }
    };

    translate();
  }, [text, selectedLanguage, translations]);

  return translatedText;
};
