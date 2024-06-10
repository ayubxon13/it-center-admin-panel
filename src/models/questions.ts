import mongoose, {Schema} from "mongoose"

const questionsSchema = new Schema(
  {
    id: Number,
    question: String,
    language: String,
    level: String,
    a: String,
    b: String,
    c: String,
    d: String,
    right: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const Questions =
  mongoose.models.Questions || mongoose.model("Questions", questionsSchema)
export default Questions
