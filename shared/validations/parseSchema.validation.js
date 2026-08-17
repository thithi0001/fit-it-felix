export const parseSchema = (schema, data) => {
    const input = data ?? {};
    const result = schema.safeParse(input);

    if (!result.success) {
        const issues = result.error?.issues ?? result.error?.errors ?? [];
        const errors = issues.map((issue) => ({
            field: issue.path?.join(".") ?? "body",
            message: issue.message,
        }));

        throw badRequest("Validation failed", errors);
    }

    return result.data;
};