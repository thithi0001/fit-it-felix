import { z } from "zod";

export const dateStringSchema = z.string().refine((value) => {
    if (!value || typeof value !== "string") return false;
    const matches = value.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
    if (matches) {
        const [, day, month, year] = matches;
        const date = new Date(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
        return !Number.isNaN(date.getTime());
    }

    const date = new Date(value);
    return !Number.isNaN(date.getTime());
}, "Invalid date");
