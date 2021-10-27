const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { MONGO_URI } = require("../config/env/keys");

const mongod = new MongoMemoryServer();

module.exports.connect = async () => {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

module.exports.clearDatabase = async () => {
  const collections = await mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};
