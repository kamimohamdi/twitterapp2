const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    if (mongoose?.connections[0].readyState) {
      return true;
    } else {
      await mongoose.connect("mongodb://127.0.0.1:27017/Twitter");
      console.log("Connect To DB Successfully :))");
    }
  } catch (err) {
    console.log("DB Connection has error ->", err);
  }
};

export default connectToDB;
