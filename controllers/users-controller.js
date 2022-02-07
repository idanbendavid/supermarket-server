const { response } = require("express");
const express = require("express");
const usersLogic = require("../logic/users-logic");
const router = express.Router();

router.get("/", async (request, response, next) => {

    let userId = usersLogic.verifyUserToken(request.headers.authorization).userId
    try {
        getUserDetails = await usersLogic.getDetailsOfUser(userId);
        response.json(getUserDetails)
    }
    catch (error) {
        return next(error);
    }
})

// login request
router.post("/login", async (request, response, next) => {

    let userLoginDetails = request.body;

    try {
        let userLogin = await usersLogic.login(userLoginDetails);
        response.json(userLogin);
    }
    catch (error) {
        return next(error);
    }
});

router.get("/verify_token", async (request, response, next) => {
    let token = request.headers.authorization

    let userDetails
    try {
        userDetails = usersLogic.verifyUserToken(token);
        response.json(userDetails);
    }
    catch (error) {
        return next(error)
    }
})


// add user - register
router.post("/", async (request, response, next) => {

    let newUser = request.body;
    
    try {
        await usersLogic.addUser(newUser);
        response.json(newUser);
    }
    catch (error) {
        return next(error);
    }
});


module.exports = router;