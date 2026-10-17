const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ connected to the mongodb");
  } catch (error) {
    console.error("mongoDb connection failed!", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
