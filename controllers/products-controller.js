const { response, request } = require("express");
const express = require("express");
const productsLogic = require("../logic/products-logic");
const usersLogic = require("../logic/users-logic");
const router = express.Router();

// get all products
router.get("/", async (request, response, next) => {
    let getProducts = request.body;

    try {
        getProducts = await productsLogic.getAllProducts(getProducts);
        response.json(getProducts)
    }
    catch (error) {
        return next(error);
    }
})

// add product
router.post("/", async (request, response, next) => {

    let newProduct = request.body;

    let userType = usersLogic.verifyUserToken(request.headers.authorization).userType
    try {

        newProduct = await productsLogic.addProduct(newProduct, userType);
        response.json(newProduct);
    }
    catch (error) {
        return next(error)
    }
})

// edit product
router.put("/", async (request, response, next) => {
    let editProduct = request.body;

    let userType = usersLogic.verifyUserToken(request.headers.authorization).userType

    try {

        editProduct = await productsLogic.editProduct(editProduct,userType);
        response.json(editProduct);
    }
    catch (error) {
        return next(error);
    }
})



module.exports = router;