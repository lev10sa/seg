// import booki model
import Booki from "../models/BookiModel.js";
import asyncHandler from "express-async-handler";

// get all bookis
export const getBookis = asyncHandler(async (req, res) => {
  try {
    const bookis = await Booki.find().sort({ name: 1, category: 1 });
    if (!bookis) {
      res.status(404);
      throw new Error(`cannot find any booki`);
    }
    res.status(200).json(bookis);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// get a booki by id
export const getBookiById = asyncHandler(async (req, res) => {
  try {
    const booki = await Booki.findById(req.params.id).sort({
      name: 1,
      category: 1,
    });
    if (!booki) {
      res.status(404);
      throw new Error(`cannot find any booki id`);
    }
    res.status(200).json(booki);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// get a booki by key
export const getBookiByKey = asyncHandler(async (req, res) => {
  try {
    const booki = await Booki.find({
      $or: [
        {
          name: {
            $regex: req.params.key,
          },
        },
        {
          category: {
            $regex: req.params.key,
          },
        },
        {
          isbn: {
            $regex: req.params.key,
          },
        },
      ],
    }).sort({ name: 1, category: 1 });
    if (!booki) {
      res.status(404);
      throw new Error(`cannot find any booki id`);
    }
    res.status(200).json(booki);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Add  booki
export const setBooki = asyncHandler(async (req, res) => {
  try {
    const booki = new Booki(req.body);
    const saved = await booki.save();
    if (!saved) {
      res.status(404);
      throw new Error(`cannot find any booki id`);
    }
    res.status(200).json(saved);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Edit booki
export const updBooki = asyncHandler(async (req, res) => {
  try {
    const booki = await Booki.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
    if (!booki) {
      res.status(404);
      throw new Error(`cannot find any booki id`);
    }
    res.status(200).json(booki);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// delete a booki
export const delBooki = asyncHandler(async (req, res) => {
  try {
    const booki = await Booki.findByIdAndDelete({ _id: req.params.id });
    if (!booki) {
      res.status(404);
      throw new Error(`cannot find any booki id`);
    }
    res.status(200).json(booki);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
