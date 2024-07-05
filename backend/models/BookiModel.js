// import dependencies
import mongoose from "mongoose";

// create a schema
const bookiSchema = mongoose.Schema(
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
    cefr: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// export the schema
export default mongoose.model("Booki", bookiSchema);
