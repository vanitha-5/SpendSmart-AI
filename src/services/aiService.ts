import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getSavingTips(expenses: { category: string; amount: number; description: string }[]) {
  const expenseSummary = expenses
    .map(e => `${e.description} (${e.category}): ₹${e.amount}`)
    .join(", ");

  const prompt = `You are a professional financial assistant for 'SpendSmart AI'. 
  Based on these monthly expenses: ${expenseSummary}.
  
  Provide 3-4 concise, professional, and actionable saving tips. 
  Focus on identifying potential waste or optimization in these specific categories.
  Tone: Professional, encouraging, and data-driven.
  Output: Return a simple list of bullet points.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "I'm having trouble analyzing your expenses right now. Please try again later for personalized tips!";
  }
}
