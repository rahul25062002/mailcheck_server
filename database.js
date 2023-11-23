import mongoose from "mongoose";

const databaseSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    emails: {
      type: [String], // Use an array if you intend to store multiple emails
      default: [],
    },
    myemail: {
      type: String,
    },
  },
  { timestamps: true }
);

const database = mongoose.model("database", databaseSchema);

export default database;
