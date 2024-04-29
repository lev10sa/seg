// import dependencies
import mongoose from "mongoose";

// create a schema
const pstSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    slug: {
      type: String,
    },
    category: {
      type: String,
    },
    date: {
      type: String,
    },
    body: {
      type: String,
    },
    img: {
      type: String,
    },
    file: [
      {
        url: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// export the schema
export default mongoose.model("Post", pstSchema);
