// import dependencies
import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// error handler
import errorHandler from "./config/error.js";

// import routers
import bookRouter from "./routes/BookRoute.js";
import bookedRouter from "./routes/BookedRoute.js";
import invoiceRouter from "./routes/InvoiceRoute.js";
import quotationRouter from "./routes/QuotationRoute.js";
import orderRouter from "./routes/OrderRoute.js";
import partyRouter from "./routes/PartyRoute.js";
import eventRouter from "./routes/EventRoute.js";
import postEnRouter from "./routes/PostEnRoute.js";
import postIdRouter from "./routes/PostIdRoute.js";

// prepare dependencies
config();
const app = express();

// use dependencies and routers
app.use(
  express.json(),
  express.urlencoded({ extended: false }),
  cors(),
  errorHandler,
  bookRouter,
  bookedRouter,
  invoiceRouter,
  quotationRouter,
  orderRouter,
  partyRouter,
  eventRouter,
  postEnRouter,
  postIdRouter
);

// connect to db
const vendor = `production`;
const uri =
  vendor === "development" ? process.env.MONGO_LOCAL : process.env.MONGO_URI;
mongoose.set(`strictQuery`, false);
mongoose.connect(uri, {}).then(() => {
  // listen to port
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log("server started..."));
});
const db = mongoose.connection;
db.on("error", (error) => window.alert(error.message));
db.once("open", () => console.log("connected to db..."));
