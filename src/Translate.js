// src/translate.js
import axios from "axios";

const API_KEY = "YOUR_GOOGLE_TRANSLATE_API_KEY"; // Replace with your API key
const API_URL = "https://translation.googleapis.com/language/translate/v2";

export const translateText = async (text, targetLang = "en") => {
  try {
    const response = await axios.post(API_URL, null, {
      params: {
        q: text,
        target: targetLang,
        key: API_KEY,
      },
    });
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error("Error translating text:", error);
    return text; // Fallback to original text on error
  }
};
