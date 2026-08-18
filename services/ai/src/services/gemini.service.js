import gemini from "../config/gemini.js";
import { env } from "../config/env.js";

export const generateResponse = async (history) => {
    const response = await gemini.models.generateContent({
        model: env.GEMINI_MODEL,
        contents: history,
    });

    return {
        content: response.text ?? "",
        usage: response.usageMetadata ?? null,
    };
};