import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { Conf } from "../src/Conf/Conf";
const genAI = new GoogleGenerativeAI(Conf.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const getFinancialAdvice = async (
  totalBudget,
  totalIncome,
  totalSpend
) => {
  try {
    const prompt = `Based on the following financial data: 
    - Total Amount that i have to pay : ${totalBudget} USD
    - Total amount that i have paid : ${totalSpend} USD
    - Income : ${totalIncome} USD
    Privide detailed financial advice in 2 sentences to help the user manage their finances.
    `;

    const chatSession = model.startChat({
      generationConfig,
      // safetySettings: Adjust safety settings
      // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {
              text: "`Based on the following financial data: \n    - Total Budget : ${2000} USD\n    - Expenses : ${0} USD\n    - Income : ${3000} USD\n    Privide detailed financial advice in 2 sentences to help the user manage their finances.",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "You have a positive cash flow of $1,000, which is great! Since you haven't incurred any expenses yet, focus on creating a detailed budget to track your spending and ensure you maximize your savings and investments. \n",
            },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage(prompt);

    if (result) {
      return result.response.text();
    }
  } catch (error) {
    console.log("Error in AI Integration", error);
  }
};
