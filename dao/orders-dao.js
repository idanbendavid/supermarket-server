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

async function validateShippingDate(newOrder) {
    let sql = `SELECT count(shippingDate) AS "amountOfShippingInDate" From orders where shippingDate=?`;

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

    let parameters = [userId, newOrder.globalId, newOrder.cartId, newOrder.finalPrice, newOrder.creditCard, newOrder.shippingCity,
    newOrder.shippingStreet, newOrder.shippingDate, newOrder.orderDate];


    let updateProductStock = `
    UPDATE products p
    LEFT JOIN items i 
    ON p.productId = i.productId 
    LEFT JOIN orders o 
    ON i.cart_id = o.cartId 
    SET p.stock = (p.stock - i.quantity)
    WHERE o.cartId = ?`;

    let updateProductStockParameters = [newOrder.cartId];
    
    try {
        newOrder = await connection.executeWithParameters(sql, parameters);
        productStockChange = connection.executeWithParameters(updateProductStock, updateProductStockParameters);
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