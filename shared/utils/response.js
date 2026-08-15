const normalizeJsonValue = (value) => {
    if (typeof value === "bigint") {
        return value.toString();
    }

    if (Array.isArray(value)) {
        return value.map((item) => normalizeJsonValue(item));
    }

    if (value && typeof value === "object") {
        if (value instanceof Date) {
            return value.toISOString();
        }

        return Object.fromEntries(
            Object.entries(value).map(([key, entryValue]) => [key, normalizeJsonValue(entryValue)])
        );
    }

    return value;
};

export const toBigInt = (value) => {
    if (value === null || value === undefined) return null;
    if (typeof value === "bigint") return value;
    return BigInt(value);
};

const buildResponse = ({ success, message, data = null, meta = null, errors = null }) => {
    const response = {
        success,
        message,
    };

    if (data !== null) {
        response.data = normalizeJsonValue(data);
    }

    if (meta !== null) {
        response.meta = normalizeJsonValue(meta);
    }

    if (errors !== null) {
        response.errors = normalizeJsonValue(errors);
    }

    return response;
};

export const successResponse = ({ data = null, message = "Success", meta = null } = {}) =>
    buildResponse({ success: true, message, data, meta });

export const createdResponse = ({ data = null, message = "Created successfully", meta = null } = {}) =>
    buildResponse({ success: true, message, data, meta });

export const paginatedResponse = ({ data = [], meta = {}, message = "Success" } = {}) =>
    buildResponse({ success: true, message, data, meta });

export const errorResponse = ({ message = "Internal Server Error", errors = null } = {}) =>
    buildResponse({ success: false, message, errors });
