const productsDao = require("../dao/products-dao");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

async function getAllProducts(getProducts) {
    getProducts = await productsDao.getAllProducts(getProducts);
    return getProducts;
}

async function addProduct(newProduct, userType) {
    validateAddProducts(userType)
    newProduct = await productsDao.addProduct(newProduct);
    return newProduct;
}

function validateAddProducts(userType) {
    if (userType !== "admin") {
        throw new ServerError(ErrorType.GENERAL_ERROR)
    }
}

async function editProduct(editProduct,userType) {
    validateEditProduct(userType)
    editProduct = await productsDao.editProduct(editProduct);
    return editProduct;
}

function validateEditProduct(userType) {
    if (userType !== "admin") {
        throw new ServerError(ErrorType.GENERAL_ERROR)
    }
}


module.exports = {
    getAllProducts,
    addProduct,
    editProduct,
}
