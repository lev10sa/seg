// import book controller
import {
  getBooks,
  getBookById,
  getBookByKey,
  updBook,
  delBook,
  setBook,
} from "../controllers/BookIdController.js";

// import express
import express from "express";

// make a router
const bookIdRouter = express.Router();

// set the routes
bookIdRouter.get("/api/bookid", getBooks);
bookIdRouter.get("/api/bookid/id/:id", getBookById);
bookIdRouter.get("/api/bookid/key/:key", getBookByKey);
bookIdRouter.post("/api/bookid", setBook);
bookIdRouter.patch("/api/bookid/id/:id", updBook);
bookIdRouter.delete("/api/bookid/id/:id", delBook);

// export the router
export default bookIdRouter;
