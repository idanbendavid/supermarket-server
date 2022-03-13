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

server.use(fileupload());

const port = process.env.PORT || 8080;

process.env.NODE_ENV = "production";
if (process.env.NODE_ENV = "production") {
    server.use(express.static('./dist/project'));
}
else {
    const corsOptions = {
        origin: ["http://localhost:4200", "https://supermarket-platform.herokuapp.com"],
        credentials: true
    }
    server.use(cors(corsOptions));

}

server.use(express.static("files"));
server.use(express.json());

server.use("/users", usersController);
server.use("/products", productsController);
server.use("/categories", categoriesController);
server.use("/carts", cartsController);
server.use("/orders", ordersController);
server.use("/files", fileController);
server.use("/items", itemsController);

server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'project/index.html'))
})


server.use(errorHandler);
server.use(loginFilter);

server.listen(port, () => console.log("listening on ", port));

// server.listen(8080);


