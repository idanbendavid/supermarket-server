const connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");

async function getAllItemsByCartId(cartId) {
    let sql = `SELECT i.productId, i.quantity, i.finalPrice, p.name, p.pricePerUnit, p.image ,c.categoryName
    FROM items i 
    LEFT JOIN products p 
    ON i.productId = p.productId
    LEFT JOIN categories c 
    ON p.categoryId = c.categoryId
    WHERE cart_id=?`;

    let parameters = [cartId];

    try {
        getCartItems = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return getCartItems
}


async function addItemToCartByCartId(newItem) {
    let sql = `INSERT INTO items (cart_id,productId,quantity,finalPrice) values(?,?,?,?)`;

    let parameters = [newItem.cartId, newItem.productId, newItem.quantity, newItem.finalPrice];
    try {
        addedItem = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.INVALID_ADDED_ITEM, error);
    }
    return addedItem;
}


async function updateItemQuantity(updatedItem) {
    let sql = `UPDATE items SET quantity=?, finalPrice=? WHERE cart_id=? AND productId=? `;

    let parameters = [updatedItem.quantity, updatedItem.finalPrice, updatedItem.cartId, updatedItem.productId];

    try {
        updatedItem = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return updatedItem
}


async function deleteItemFromCartByCartIdAndProductId(cartId, productId) {
    let sql = `DELETE FROM items WHERE cart_id=? AND productId=?`;

    let parameters = [cartId, productId];

    try {
        deletedItemFromCart = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return deletedItemFromCart;
}


async function deleteAllItemsOfCart(cartId) {
    let sql=`delete from items where cart_id=?`;
    let parameters = [cartId];
    try {
        deleteItemsOfCart = await connection.executeWithParameters(sql, parameters);
        console.log(deleteItemsOfCart);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return deleteItemsOfCart;
}


module.exports = {
    getAllItemsByCartId,
    addItemToCartByCartId,
    updateItemQuantity,
    deleteItemFromCartByCartIdAndProductId,
    deleteAllItemsOfCart
}
