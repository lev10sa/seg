// import dependencies
import express from "express";
import {
  setPost,
  getPosts,
  getPostById,
  getPostByKey,
  updPost,
  delPost,
} from "../controllers/PostController.js";

// router init
const postRouter = express.Router();

// set the routes
postRouter.get("/api/posts", getPosts);
postRouter.get("/api/posts/id/:id", getPostById);
postRouter.get("/api/posts/key/:key", getPostByKey);
postRouter.post("/api/posts", setPost);
postRouter.patch("/api/posts/id/:id", updPost);
postRouter.delete("/api/posts/id/:id", delPost);

export default postRouter;
