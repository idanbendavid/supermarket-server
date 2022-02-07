const connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");

async function getCartByUserId(userId) {
    let sql = `SELECT c.cartId, c.dateCreated FROM carts c       
    LEFT JOIN orders o ON c.cartId = o.cartId
    WHERE c.user_id= ?
    AND o.orderId is null`;

    let parameters = [userId];

    try {
        getCarts = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return getCarts[0];
}

async function addCart(userId) {
    let sql = `INSERT INTO carts (user_id, dateCreated) VALUES (?,now())`;

    let parameters = [userId];

    try {
        newCart = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.INVALID_CART, error);
    }
    return newCart;
}



module.exports = {
    getCartByUserId,
    addCart,
}