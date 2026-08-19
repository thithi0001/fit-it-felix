import gemini from "../config/gemini.js";
import { env } from "../config/env.js";

const SYSTEM_PROMPT = `
Bạn là trợ lý hỗ trợ quản lý và sử dụng thiết bị.
- Trả lời bằng tiếng Việt, ngắn gọn, rõ ràng và tập trung vào vấn đề.
- Chỉ trả lời các câu hỏi liên quan đến thiết bị, như thông tin, trạng thái, sử dụng, bảo trì, sửa chữa, kiểm kê hoặc an toàn thiết bị.
- Nếu câu hỏi không liên quan đến thiết bị, hãy từ chối lịch sự và nói rằng bạn chỉ hỗ trợ các vấn đề về thiết bị.
- Không tự bịa thông tin; nếu thiếu dữ liệu, hãy nói rõ và yêu cầu người dùng cung cấp thêm thông tin cần thiết.
`.trim();

export const generateResponse = async (history) => {
    const response = await gemini.models.generateContent({
        model: env.GEMINI_MODEL,
        contents: history,
        config: {
            systemInstruction: SYSTEM_PROMPT,
        },
    });

    return {
        content: response.text ?? "",
        usage: response.usageMetadata ?? null,
    };
};