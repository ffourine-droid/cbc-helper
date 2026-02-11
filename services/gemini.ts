
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAiResponse = async (question: string, language: 'en' | 'sw') => {
  try {
    const model = 'gemini-3-flash-preview';
    const systemInstruction = `
      You are "CBC Mama", a helpful assistant for Kenyan parents navigating the Competency-Based Curriculum (CBC).
      Provide simple, encouraging, and cost-effective advice.
      Focus on low-cost materials available in Nairobi (e.g., plastic bottles, newspapers, cassava flour).
      Keep answers short and mobile-friendly.
      Respond in ${language === 'en' ? 'English' : 'Kiswahili'}.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: question,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return language === 'en' 
      ? "I'm having a little trouble connecting. Please try again or check our saved guides!" 
      : "Samahani, ninapata hitilafu kidogo. Tafadhali jaribu tena baadaye au kagua miongozo yetu!";
  }
};

export const getDailyTip = async (language: 'en' | 'sw') => {
  try {
    const model = 'gemini-3-flash-preview';
    const prompt = language === 'en' 
      ? "Give a 1-sentence quick tip for a parent to help their child with a CBC project today using household items."
      : "Toa kidokezo kifupi cha sentensi moja kwa mzazi kumsaidia mtoto wake na mradi wa CBC leo kwa kutumia vifaa vya nyumbani.";

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        temperature: 0.9,
      },
    });

    return response.text;
  } catch (error) {
    return language === 'en'
      ? "Save old plastic bottles for science projects—they are useful for everything!"
      : "Weka chupa za plastiki kuukuu kwa miradi ya sayansi—zinafaa kwa kila kitu!";
  }
};
