import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

interface Language {
  code: string;
  name: string;
  isRtl?: boolean;
}

const defaultLanguages: Language[] = [
  { code: "ar", name: "العربية", isRtl: true },
  { code: "en", name: "English" },
  
];

interface LanguageContextValue {
  selectedLanguage: Language;
  handleChangeLanguage: (languageCode: string) => void;
  languages?: Language[];
}

export const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({
  children,
  languages = defaultLanguages,
}: {
  children: React.ReactNode;
  languages?: Language[];
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(() => {
    const storedLanguageCode = localStorage.getItem("selectedLanguage");
    return (
      languages.find((lang) => lang.code === storedLanguageCode) || languages[0]
    );
  });

  const handleChangeLanguage = (languageCode: string) => {
    const language = languages.find((lang) => lang.code === languageCode);
    if (language) {
      setSelectedLanguage(language);
      localStorage.setItem("selectedLanguage", language.code);
      document.documentElement.dir = language.isRtl ? "rtl" : "ltr";
      window.location.reload();
    }
  };

  useEffect(() => {
    document.documentElement.dir = selectedLanguage.isRtl ? "rtl" : "ltr";
  }, [selectedLanguage]);

  const value = useMemo(
    () => ({
      selectedLanguage,
      handleChangeLanguage,
      languages,
    }),
    [selectedLanguage, languages]
  );

  return (
    <LanguageContext.Provider value={value} >
      {children}
    </LanguageContext.Provider>
  );
};
