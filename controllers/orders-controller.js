const { response } = require("express");
const express = require("express");
const ordersLogic = require("../logic/orders-logic");
const usersLogic = require("../logic/users-logic");
const router = express.Router();

// get order history of user
router.get("/", async (request, response, next) => {

    let userId = usersLogic.verifyUserToken(request.headers.authorization).userId

    try {
        getOrdersOfUser = await ordersLogic.getUserOrderHistory(userId);
        response.json(getOrdersOfUser)
    }
    catch (error) {
        return next(error);
    }
})

// new order
router.post("/", async (request, response, next) => {

    let newOrder = request.body;

    let userId = usersLogic.verifyUserToken(request.headers.authorization).userId

    try {
        newOrder = await ordersLogic.addOrder(newOrder, userId);
        response.json(newOrder);
    }
    catch (error) {
        return next(error);
    }
})

module.exports = router;