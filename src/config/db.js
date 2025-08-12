const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri =
      process.env.MONGO_URI ||
      "mongodb+srv://machavasu:machavasu@cluster0.vlqkppl.mongodb.net/medical?retryWrites=true&w=majority";
    await mongoose.connect(uri, {
      useNewUrlParser: true,
    });
    console.log("MongoDB connectd");
  } catch (err) {
    console.error("MongoDB connected error", err);
    process.exit(1);
  }
};

module.exports = connectDB;
