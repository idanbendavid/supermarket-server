const { response, request } = require("express");
const express = require("express");
const categoriesLogic = require("../logic/categories-logic");
const usersLogic = require("../logic/users-logic");
const router = express.Router();


// get categories
router.get("/", async (request, response, next) => {

    let getCategories = request.body;

    try {
        getCategories = await categoriesLogic.getAllCategories(getCategories);
        response.json(getCategories);
    }
    catch (error) {
        return next(error);
    }
})

// get all products by category id
router.get("/:categoryId", async (request, response, next) => {

    let categoryId = request.params.categoryId;

    try {
        categoryId = await categoriesLogic.getProductsByCategoryId(categoryId);
        response.json(categoryId);
    }
    catch (error) {
        return next(error);
    }
})


// add category
router.post("/", async (request, response, next) => {

    let newCategory = request.body;

    let userType = usersLogic.verifyUserToken(request.headers.authorization).userType

    try {
        newCategory = await categoriesLogic.addCategory(newCategory, userType);
        response.json(newCategory);
    }
    catch (error) {
        return next(error);
    }
})

module.exports = router;