const { response, request } = require("express");
const express = require("express");
const itemsLogic = require("../logic/items-logic");
const router = express.Router();

// get items by cart id
router.get("/:cartId", async (request, response, next) => {

    let cartId = request.params.cartId

    try {
        let getCartItems = await itemsLogic.getAllItemsByCartId(cartId);
        response.json(getCartItems)
    }
    catch (error) {
        return next(error);
    }
})


// add item
router.post("/", async (request, response, next) => {

    let newItem = request.body

    try {
        let addedItem = await itemsLogic.addItemToCartByCartId(newItem);
        response.json(addedItem)
    }
    catch (error) {
        return next(error);
    }
})  


// edit item
router.put("/", async (request, response, next) => {

    let updatedItem = request.body

    try {
        updatedItem = await itemsLogic.updateItemQuantity(updatedItem);
        response.json(updatedItem)
    }
    catch (error) {
        return next(error);
    }
})


// delete 1 item 
router.delete("/:cartId/:productId", async (request, response, next) => {

    let cartId = request.params.cartId;
    let productId = request.params.productId;

    try {
        let deleteItemFromCart = await itemsLogic.deleteItemFromCartByCartIdAndProductId(cartId, productId);
        response.json(deleteItemFromCart);
    }
    catch (error) {
        return next(error);
    }
})


// delete all items of cart
router.delete("/:cartId/", async (request, response, next) => {
    let cartId = request.params.cartId;

    try {
        let deleteItemsOfCart = await itemsLogic.deleteAllItemsOfCart(cartId);
        response.json(deleteItemsOfCart);
    }
    catch (error) {
        return next(error);
    }
})






module.exports = router;