import mongoose, {Schema} from "mongoose";

const coursesSchema = new Schema(
  {
    id: Number,
    image: String,
    levelImage: String,
    language: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Courses =
  mongoose.models.Courses || mongoose.model("Courses", coursesSchema);

export default Courses;
