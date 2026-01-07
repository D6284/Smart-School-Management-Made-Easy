
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAcademicInsights = async (studentName: string, performance: number[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `As an AI Academic Advisor, analyze this student's performance data and provide a concise, encouraging 2-sentence feedback. 
      Student: ${studentName}
      Recent Scores: ${performance.join(', ')}`,
      config: {
        systemInstruction: "You are a professional academic advisor at a high-end private school. Keep insights professional, data-driven, and supportive.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return "Keep up the hard work! Your consistent effort is showing in your recent progress.";
  }
};
