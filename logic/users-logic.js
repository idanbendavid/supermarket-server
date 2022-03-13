const usersDao = require("../dao/users-dao");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const config = require("../config.json");
const jwt_decode = require("jwt-decode")

const saltRight = "gbhjohavpwl";
const saltLeft = ";@!$--mnlcfs";

async function getDetailsOfUser(userId) {
    getUserDetails = await usersDao.getDetailsOfUser(userId);
    return getUserDetails;
}

// login
async function login(userLoginDetails) {
    validateLoginEmailAndPassword(userLoginDetails);
    userLoginDetails.password = crypto.createHash("md5").update(saltLeft + userLoginDetails.password + saltRight).digest("hex");

    userLoginDetails = await usersDao.login(userLoginDetails);

    const token = jwt.sign({
        userId: userLoginDetails.userId,
        userType: userLoginDetails.userType,
        firstName: userLoginDetails.firstName
    }, config.secret);


    return { token: token, userType: userLoginDetails.userType, userId: userLoginDetails.userId, firstName: userLoginDetails.firstName };
}

// login validation
function validateLoginEmailAndPassword(userLoginDetails) {
    if (!userLoginDetails.email) {
        throw new ServerError(ErrorType.INVALID_EMAIL);
    }
    if (!userLoginDetails.password) {
        throw new ServerError(ErrorType.INVALID_PASSWORD);
    }
}

async function verifyUserToken(token) {

    let decoded = await jwt_decode(token);

    console.log(decoded, "line 47 verify token");

    let userId = decoded.userId;
    let userType = decoded.userType;
    let firstName = decoded.firstName;

    return { userId, userType, firstName }
}


// add user
async function addUser(newUser) {

    addUserValidation(newUser);

    let isEmailExist = await usersDao.isEmailExist(newUser);

    if (isEmailExist) {
        throw new ServerError(ErrorType.EMAIL_ALREADY_EXIST);
    }

    newUser.password = crypto.createHash("md5").update(saltLeft + newUser.password + saltRight).digest("hex");

    let registerUser = await usersDao.addUser(newUser);

    const token = jwt.sign({
        userId: registerUser.insertId,
        userType: newUser.userType,
        firstName: newUser.firstName
    }, config.secret);

    return { token, newUser, registerUser };
}

async function addUserValidation(newUser) {
    if (!newUser.email) {
        throw new ServerError(ErrorType.INVALID_EMAIL);
    }
    if (!newUser.password) {
        throw new ServerError(ErrorType.INVALID_PASSWORD);
    }
    if (newUser.userType != "admin") {
        return newUser.userType = "customer";
    }
    if (newUser.userType === "admin") {
        newUser.city = "none",
            newUser.street = "none"
    }
}



module.exports = {
    getDetailsOfUser,
    login,
    verifyUserToken,
    addUser,
}


