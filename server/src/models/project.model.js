import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    name: {
      typeof: String,
      required: true,
    },
    lang: {
      typeof: String,
      required: true,
    },
    code: {
      typeof: String,
      required: true,
    },
    createdBY: {
      typeof: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
