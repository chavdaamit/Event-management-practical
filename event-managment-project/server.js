import express from "express";

import HttpError from "./middleware/HttpError.js";

import uploads from "./middleware/upload.js";

import connectDB from "./config/db.js";

import dotenv from "dotenv";

import eventRoutes from "./routes/eventRoutes.js";
dotenv.config({ path: "./.env" });
const app = express();
app.use("/event", eventRoutes);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "hello from server" });
});

app.use((req, res, next) => {
  return next(new HttpError("routes is not defaind", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.StatusCode || 500).json({
    message: error.message || "something went wrong try again",
  });
});
const port = 5000;

async function ServerStart() {
  try {
    const connect = await connectDB();

    if (!connect) {
      throw new Error("failed to connect db");
    }

    app.listen(port, (err) => {
      if (err) {
        return console.log(err.message);
      }
      console.log(`server running on poet ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}
ServerStart();
