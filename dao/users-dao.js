const connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");

async function getDetailsOfUser(userId) {

    let sql = "SELECT userId,globalId,email,firstName,LastName,city,street FROM users where userId=?";

    let parameters = [userId];

    try {
        getUserDetails = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return getUserDetails
}

async function login(user) {
    let sql = "SELECT * FROM users WHERE email =? AND password =?";

    let parameters = [user.email, user.password];

    let usersLoginResult;
    try {
        usersLoginResult = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), error);
    }

    if (usersLoginResult === null || usersLoginResult.length === 0) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    console.log("connected");

    let loggedIn = {
        email: usersLoginResult[0].email,
        userId: usersLoginResult[0].userId,
        userType: usersLoginResult[0].userType,
        firstName: usersLoginResult[0].firstName
    }
    return loggedIn;
}

async function addUser(newUser) {
    let sql = `INSERT INTO users (globalId,email,password,userType,firstName,lastName,city,street)
    VALUES(?,?,?,?,?,?,?,?)`;

    let parameters = [newUser.globalId, newUser.email, newUser.password, newUser.userType, newUser.firstName, newUser.lastName,
    newUser.city, newUser.street];

    try {
        newUser = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
    }
    return newUser;
}

// validation for add user in logic layer   
async function isEmailExist(newUser) {

    let sql = "SELECT * FROM users WHERE email=?";

    let parameters = [newUser.email];

    let emailValidationResult;

    try {
        emailValidationResult = await connection.executeWithParameters(sql, parameters);
        return emailValidationResult[0];
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
}



module.exports = {
    getDetailsOfUser,
    login,
    addUser,
    isEmailExist
}