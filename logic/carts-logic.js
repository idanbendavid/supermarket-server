const cartDao = require("../dao/carts-dao");
const itemsDao = require("../dao/items-dao");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

async function getCartByUserId(userId) {
    let getCartOfUser;
    
    if (!userId) {
        throw new ServerError(ErrorType.GET_CART, error)
    }
    else {
        getCartOfUser = await cartDao.getCartByUserId(userId);
    }
    let lineItems = await itemsDao.getAllItemsByCartId(getCartOfUser.cartId);

    getCartOfUser.lineItems = lineItems;

    return getCartOfUser;
}

async function addCart(userId) {
    newCart = await cartDao.addCart(userId);
    return newCart;
}



module.exports = {
    getCartByUserId,
    addCart,
}
