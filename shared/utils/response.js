const buildResponse = ({ success, message, data = null, meta = null, errors = null }) => {
    const response = {
        success,
        message,
    };

    if (data !== null) {
        response.data = data;
    }

    if (meta !== null) {
        response.meta = meta;
    }

    if (errors !== null) {
        response.errors = errors;
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
