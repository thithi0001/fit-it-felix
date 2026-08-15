const formatDate = (date) => {
    return new Date(date).toISOString();
};

const parseDateInput = (value) => {
    if (!value) return null;

    if (value instanceof Date) return value;

    if (typeof value === "string") {
        const match = value.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
        if (match) {
            const [, day, month, year] = match;
            return new Date(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
        }

        const parsed = new Date(value);
        if (!Number.isNaN(parsed.getTime())) return parsed;
    }

    return null;
};

export {
    formatDate,
    parseDateInput,
};