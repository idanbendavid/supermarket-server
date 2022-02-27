const express = require("express");
const path = require('path');


const usersController = require("./controllers/users-controller");
const productsController = require("./controllers/products-controller");
const categoriesController = require("./controllers/categories-controller");
const cartsController = require("./controllers/carts-controller");
const ordersController = require("./controllers/orders-controller");
const fileController = require("./controllers/files-controller");
const itemsController = require("./controllers/items-controller");

const errorHandler = require("./errors/error-handler");
const loginFilter = require("./filters/login-filter");
const fileupload = require("express-fileupload");

const cors = require('cors');
const server = express();

server.use(express.static('./dist/project'));

server.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/project/'}),
);

server.use(fileupload());
server.use(express.static("files"));
server.use(express.json());

server.use(cors({ origin: ["http://localhost:4200", "http://supermarket-platform.herokuapp.com:4200"] }));

server.use("/users", usersController);
server.use("/products", productsController);
server.use("/categories", categoriesController);
server.use("/carts", cartsController);
server.use("/orders", ordersController);
server.use("/files", fileController);
server.use("/items", itemsController);


server.use(errorHandler);
server.use(loginFilter);

server.listen(process.env.PORT || 8080);


