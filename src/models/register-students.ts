import mongoose, {Schema} from "mongoose"

const RegisterStudentsSchema = new Schema(
  {
    id: Number,
    fullName: String,
    number: String,
    role: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const RegisterStudents =
  mongoose.models.RegisterStudents ||
  mongoose.model("RegisterStudents", RegisterStudentsSchema)

export default RegisterStudents
