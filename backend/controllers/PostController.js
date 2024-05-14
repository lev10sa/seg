// import dependencies
import Post from "../models/PostModel.js";
import asyncHandler from "express-async-handler";

// Add  Post
export const setPost = asyncHandler(async (req, res) => {
  try {
    const pst = new Post(req.body);
    const saved = await pst.save();
    if (!saved) {
      res.status(404);
      throw new Error(`cannot add any pst`);
    }
    res.status(200).json(saved);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// get all pst
export const getPosts = asyncHandler(async (req, res) => {
  try {
    const pst = await Post.find().populate("file").sort({ date: -1, title: 1 });
    if (!pst) {
      res.status(404);
      throw new Error(`cannot find any Post`);
    }
    res.status(200).json(pst);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// get a Post by id
export const getPostById = asyncHandler(async (req, res) => {
  try {
    const pst = await Post.findById(req.params.id)
      .populate("file")
      .sort({ date: -1, title: 1 });
    if (!pst) {
      res.status(404);
      throw new Error(`cannot find any Post id`);
    }
    res.status(200).json(pst);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// get a Post by key
export const getPostByKey = asyncHandler(async (req, res) => {
  try {
    const pst = await Post.find({
      $or: [
        {
          title: {
            $regex: req.params.key,
          },
        },
        {
          slug: {
            $regex: req.params.key,
          },
        },
        {
          category: {
            $regex: req.params.key,
          },
        },
        {
          body: {
            $regex: req.params.key,
          },
        },
        {
          file: {
            $elemMatch: {
              url: { $regex: req.params.key, $options: "i" }, // Case-insensitive search
            },
          },
        },
      ],
    })
      .populate("file")
      .sort({ date: -1, title: 1 });
    if (!pst) {
      res.status(404);
      throw new Error(`cannot find any Post id`);
    }
    res.status(200).json(pst);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Edit Post
export const updPost = asyncHandler(async (req, res) => {
  try {
    const pst = await Post.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true } // exclude file field
    );
    if (!pst) {
      res.status(404);
      throw new Error(`cannot find any Post id`);
    }
    res.status(200).json(pst);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// delete a Post
export const delPost = asyncHandler(async (req, res) => {
  try {
    const pst = await Post.findByIdAndDelete({ _id: req.params.id });
    if (!pst) {
      res.status(404);
      throw new Error(`cannot find any Post id`);
    }
    res.status(200).json(pst);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
