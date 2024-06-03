// import dependencies
import mongoose from "mongoose";

// create a schema
const bookIdSchema = mongoose.Schema(
  {
    src: {
      type: String,
    },
    url: {
      type: String,
    },
    name: {
      type: String,
    },
    isbn: {
      type: String,
    },
    category: {
      type: String,
    },
    bookPrice: {
      type: String,
    },
    ebookPrice: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// export the schema
export default mongoose.model("BookId", bookIdSchema);
