// import dependencies
import mongoose from "mongoose";

// create a schema
const prtSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    company: {
      type: String,
    },
    job: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    file: {
      type: String,
    },
    event: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// export the schema
export default mongoose.model("Party", prtSchema);
