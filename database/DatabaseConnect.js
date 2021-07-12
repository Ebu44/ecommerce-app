const mongoose = require("mongoose");
const { MONGO_URI } = require("../config/env/keys");

module.exports = () => {
  mongoose.connect(
    MONGO_URI,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log("Database Connected");
    }
  );
};
