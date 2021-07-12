const express = require("express");
require("./database/DatabaseConnect")();
const indexRouter = require("./routers/index");
const verifyToken = require("./middleware/verify-token");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", verifyToken);
app.use("/", indexRouter);

app.listen(8000, () => {
  console.log("Server running");
});
