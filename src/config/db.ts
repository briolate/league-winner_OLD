import mongoose from "mongoose";
import config from "config";

const db = config.get<string>("mongoURI");

export const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      dbName: "my-db",
      useFindAndModify: false,
    });

    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};
