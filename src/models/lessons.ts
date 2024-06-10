import mongoose, {Schema} from "mongoose"

const lessonsSchema = new Schema(
  {
    id: Number,
    lessonName: String,
    languageName: String,
    videoLink: String,
    level: String,
    homework: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const Lessons =
  mongoose.models.Lessons || mongoose.model("Lessons", lessonsSchema)

export default Lessons
