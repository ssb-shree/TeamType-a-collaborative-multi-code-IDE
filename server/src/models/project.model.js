import mongoose, { mongo, Schema } from "mongoose";

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
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
