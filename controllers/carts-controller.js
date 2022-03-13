const { response, request } = require("express");
const express = require("express");
const cartLogic = require("../logic/carts-logic");
const usersLogic = require("../logic/users-logic");
const router = express.Router();


// get cart by user id
router.get("/", async (request, response, next) => {

    let userId = usersLogic.verifyUserToken(request.headers.authorization).userId;
    console.log(userId, "line 12 cart controller");
    try {
        let getCartOfUser = await cartLogic.getCartByUserId(userId);
        response.json(getCartOfUser)
    }
    catch (error) {
        return next(error);
    }
})

// add cart
router.post("/", async (request, response, next) => {
    let newCart = request.body;
    
    let userId = usersLogic.verifyUserToken(request.headers.authorization).userId;

    try {
        newCart = await cartLogic.addCart(userId);
        response.json(newCart);
    }
    catch (error) {
        return next(error);
    }
})



module.exports = router;