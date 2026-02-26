
import { GoogleGenAI, Type } from "@google/genai";

/**
 * Helper to perform retries with exponential backoff.
 * Useful for handling transient 500 errors or RPC proxy hiccups.
 */
async function withRetry<T>(fn: () => Promise<T>, maxRetries = 5): Promise<T> {
  let lastError: any;
  for (let i = 0; i < maxRetries; i++) {
    try {
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        throw new Error("Network is offline. Please check your connection.");
      }
      return await fn();
    } catch (err: any) {
      lastError = err;
      
      // Determine if the error is retryable
      const errorMessage = err?.message?.toLowerCase() || "";
      const isRetryable = 
        err?.status === "UNKNOWN" || 
        err?.code === 500 || 
        err?.code === 429 || // Rate limit
        errorMessage.includes("rpc failed") ||
        errorMessage.includes("500") ||
        errorMessage.includes("timeout") ||
        errorMessage.includes("network error") ||
        errorMessage.includes("failed to fetch");
        
      if (isRetryable && i < maxRetries - 1) {
        // Exponential backoff: 1s, 2s, 4s, 8s... with jitter
        const delay = Math.min(Math.pow(2, i) * 1000 + Math.random() * 1000, 10000);
        console.warn(`API call failed (attempt ${i + 1}/${maxRetries}). Retrying in ${Math.round(delay)}ms...`, err);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw err;
    }
  }
  throw lastError;
}

export const getTutorResponse = async (
  companionName: string, 
  subject: string, 
  topic: string, 
  userMessage: string,
  history: { role: 'user' | 'model'; text: string }[],
  customInstruction?: string
) => {
  return withRetry(async () => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const defaultInstruction = `
      You are ${companionName}, a friendly and expert AI tutor specialized in ${subject}. 
      The current lesson topic is ${topic}. 
      Your goal is to teach the user in an engaging, interactive, and encouraging way.
      Ask questions to check understanding. Use analogies. Keep responses concise but informative.
      Always stay in character.
    `;

    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: customInstruction || defaultInstruction,
      },
    });

    const response = await chat.sendMessage({ message: userMessage });
    return response.text;
  });
};

export const generateLessonSummary = async (topic: string, conversation: string) => {
  return withRetry(async () => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize this learning session about ${topic} into 3 key takeaways: ${conversation}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            takeaways: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["summary", "takeaways"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  });
};
