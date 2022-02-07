const connection = require("./connection-wrapper");
const cartDao = require("../dao/carts-dao");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");

async function getUserOrderHistory(userId) {
    let sql = "SELECT * FROM orders WHERE userId=?";

    let parameters = [userId];

    try {
        getOrdersOfUser = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return getOrdersOfUser
}

async function validateShippingDate(newOrder){
    let sql=`SELECT count(shippingDate) AS "amountOfShippingInDate" From orders where shippingDate=?`;

    let parameters = [newOrder.shippingDate];

    try {
        shippingDateValidation = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return shippingDateValidation[0];
}

async function addOrder(newOrder, userId) {
    let sql = "INSERT INTO orders (userId,globalId,cartId,finalPrice,creditCard,shippingCity,shippingStreet,shippingDate,orderDate) VALUES (?,?,?,?,?,?,?,?,?)";

    let parameters = [userId,newOrder.globalId, newOrder.cartId, newOrder.finalPrice, newOrder.creditCard, newOrder.shippingCity,
        newOrder.shippingStreet, newOrder.shippingDate,newOrder.orderDate];

    try {
        newOrder = await connection.executeWithParameters(sql, parameters);
        cartDao.addCart(userId);
    }
    catch (error) {
        throw new ServerError(ErrorType.INVALID_ORDER, error)
    }
    return newOrder;
}

module.exports = {
    getUserOrderHistory,
    validateShippingDate,
    addOrder
}