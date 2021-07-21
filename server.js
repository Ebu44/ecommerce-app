const express = require("express");
const database = require("./database/DatabaseConnect");
const path = require("path");

database();

const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");

const User = require("./models/User");
const Product = require("./models/Product");
const Category = require("./models/Category");
const Cart = require("./models/Cart");
const Order = require("./models/Order");

const indexRouter = require("./routers/index");
const verifyToken = require("./middleware/verify-token");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
  Databases: [database],
  rootPath: "/admin",
  resources: [User, Product, Category, Cart, Order],
});

const router = AdminBroExpress.buildRouter(adminBro);

app.use(adminBro.options.rootPath, router);

app.use("/api", verifyToken);
app.use("/", indexRouter);

app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
