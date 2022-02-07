const connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");

async function getAllCategories(getCategories) {
    let sql = "SELECT * FROM categories";

    let parameters = [getCategories];

    try {
        getCategories = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return getCategories
}

async function getProductsByCategoryId(categoryId) {
    let sql = "SELECT p.name, p.pricePerUnit, p.image, cat.categoryName From products p LEFT JOIN categories cat on p.categoryId = cat.categoryId WHERE p.categoryId=?";

    let parameters = [categoryId];

    try {
        categoryId = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return categoryId;
}

async function addCategory(newCategory) {
    let sql = "INSERT INTO categories (categoryName) VALUES (?)";

    let parameters = [newCategory.categoryName];

    try {
        newCategory = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.INVALID_CATEGORY, error);
    }
    return newCategory;
}

module.exports = {
    getAllCategories,
    getProductsByCategoryId,
    addCategory
}