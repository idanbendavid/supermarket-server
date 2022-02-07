const categoriesDao = require("../dao/categories-dao");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

async function getAllCategories(getCategories) {
    getCategories = await categoriesDao.getAllCategories(getCategories);
    return getCategories;
}

async function getProductsByCategoryId(categoryId) {
    categoryId = await categoriesDao.getProductsByCategoryId(categoryId);
    return categoryId;
}

async function addCategory(newCategory, userType) {
    valiadteAddCategory(userType);
    newCategory = await categoriesDao.addCategory(newCategory);
    return newCategory;
}

function valiadteAddCategory(userType) {
    if (userType !== "admin") {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}


module.exports = {
    getAllCategories,
    getProductsByCategoryId,
    addCategory
}
