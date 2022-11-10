const STATUS_CODE: {
    OK: number;
    CREATED: number;
    NO_CONTENT: number;
    BAD_REQUEST: number;
    NOT_FOUND: number;
    UNAUTHORIZED: number;
    SERVER_ERROR: number;
    UNPROCESSABLE_ENTITY: number;
    CONFLICT: number;
} = Object.freeze({
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    SERVER_ERROR: 500,
    UNPROCESSABLE_ENTITY: 422,
    CONFLICT: 409,
});

export { STATUS_CODE };
