const connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");

async function getAllProducts(getProducts) {
    let sql = `SELECT p.productId, p.name, cat.categoryName, p.pricePerUnit, p.image, p.stock 
    FROM products p LEFT JOIN categories cat ON p.categoryId = cat.categoryId`;

    let parameters = [getProducts];

    try {
        getProducts = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return getProducts;
}

async function addProduct(newProduct) {
    let sql = "INSERT INTO products(name,categoryId,pricePerUnit,image,stock) values (?,?,?,?,?)";

    let parameters = [newProduct.name, newProduct.categoryId, newProduct.pricePerUnit, newProduct.image, newProduct.stock];
    try {
        newProduct = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.INVALID_ADDED_PRODUCT, error);
    }
    return newProduct;
}

async function editProduct(editProduct) {
    let sql = "UPDATE products SET name=?, categoryId=?, pricePerUnit=?, image=?, stock=? WHERE (productId=?)";

    let parameters = [editProduct.name, editProduct.categoryId, editProduct.pricePerUnit, editProduct.image,
    editProduct.stock, editProduct.productId];

    try {
        editProduct = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.INVALID_EDITED_PRODUCT, error);
    }
    return editProduct;
}


module.exports = {
    getAllProducts,
    addProduct,
    editProduct,
}