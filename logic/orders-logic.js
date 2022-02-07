const ordersDao = require("../dao/orders-dao");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

async function getUserOrderHistory(userId) {
    getOrdersOfUser = await ordersDao.getUserOrderHistory(userId);
    return getOrdersOfUser;
}

async function addOrder(newOrder, userId) {

    let shippingDateValidation = await ordersDao.validateShippingDate(newOrder);

    if (shippingDateValidation.amountOfShippingInDate === 3) {
        throw new ServerError(ErrorType.DATE_FULL);
    }
    else{
        newOrder = await ordersDao.addOrder(newOrder, userId);
    }
    return newOrder;
}

module.exports = {
    getUserOrderHistory,
    addOrder
}
