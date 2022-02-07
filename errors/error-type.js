let ErrorType = {

    GENERAL_ERROR: {
        id: 1,
        httpCode: 600,
        message: "A big fuck up which we'll never tell you of had just happend. And now : A big fat lie....'A general error ....'",
        isShowStackTrace: true
    },
    UNAUTHORIZED: {
        id: 2,
        httpCode: 400,
        message: "Login failed, invalid email or password",
        isShowStackTrace: false
    },
    INVALID_ADDED_PRODUCT: {
        id: 3,
        httpCode: 401,
        message: "could not add product, check entered values",
        isShowStackTrace: false
    },
    INVALID_EDITED_PRODUCT: {
        id: 4,
        httpCode: 402,
        message: "could not edit cart, check entered values",
        isShowStackTrace: false
    },
    INVALID_ORDER: {
        id: 5,
        httpCode: 403,
        message: "could not complete order, check entered values",
        isShowStackTrace: false
    },
    INVALID_CART: {
        id: 6,
        httpCode: 404,
        message: "could not add cart, check entered values",
        isShowStackTrace: false
    },
    INVALID_CATEGORY: {
        id: 7,
        httpCode: 405,
        message: "could not add category, check entered values",
        isShowStackTrace: false
    },
    EMAIL_ALREADY_EXIST: {
        id: 8,
        httpCode: 406,
        message: "Email already exist",
        isShowStackTrace: false
    },
    INVALID_EMAIL: {
        id: 9,
        httpCode: 407,
        message: "Invalid email",
        isShowStackTrace: false
    },
    INVALID_PASSWORD: {
        id: 10,
        httpCode: 408,
        message: "Invalid password",
        isShowStackTrace: false
    },
    INVALID_ADDED_ITEM: {
        id: 11,
        httpCode: 409,
        message: "couldn't add item, Please Make Sure You are Logged In",
        isShowStackTrace: false
    },
    DATE_FULL: {
        id: 12,
        httpCode: 410,
        message: "Shipping Date Already Full, Select Another Date",
        isShowStackTrace: false
    },
}

module.exports = ErrorType;