// import Booki controller
import {
  getBookis,
  getBookiById,
  getBookiByKey,
  updBooki,
  delBooki,
  setBooki,
} from "../controllers/BookiController.js";

// import express
import express from "express";

// make a router
const bookiRouter = express.Router();

// set the routes
bookiRouter.get("/api/booki", getBookis);
bookiRouter.get("/api/booki/id/:id", getBookiById);
bookiRouter.get("/api/booki/key/:key", getBookiByKey);
bookiRouter.post("/api/booki", setBooki);
bookiRouter.patch("/api/booki/id/:id", updBooki);
bookiRouter.delete("/api/booki/id/:id", delBooki);

// export the router
export default bookiRouter;
