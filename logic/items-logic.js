const itemsDao = require("../dao/items-dao");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");


async function getAllItemsByCartId(cartId){
    let getCartItems = await itemsLogic.getAllItemsByCartId(cartId);
    return getCartItems;
}

async function addItemToCartByCartId(newItem){
    let addedItem = await itemsDao.addItemToCartByCartId(newItem);
    return addedItem;
}

async function updateItemQuantity(updatedItem){
    updatedItem = await itemsDao.updateItemQuantity(updatedItem);
    return updatedItem;
}

async function deleteItemFromCartByCartIdAndProductId(cartId,productId){
    let deleteItemFromCart = await itemsDao.deleteItemFromCartByCartIdAndProductId(cartId,productId);
    return deleteItemFromCart;
}

async function deleteAllItemsOfCart(cartId){
    let deleteItemsOfCart = await itemsDao.deleteAllItemsOfCart(cartId);
    return deleteItemsOfCart;
}

module.exports = {
    getAllItemsByCartId,
    addItemToCartByCartId,
    updateItemQuantity,
    deleteItemFromCartByCartIdAndProductId,
    deleteAllItemsOfCart
}
