import mongoose, {Schema} from "mongoose"

const studentsSchema = new Schema(
  {
    id: Number,
    fullName: String,
    birthday: String,
    address: String,
    group: String,
    personalPhone: String,
    homePhone: String,
    certificate: Boolean,
    graduated: Boolean,
    userPercentage: Number,
    userPhoto: String,
    quizLevel: Number,
    videoLevel: Number,
    groupName: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const Students =
  mongoose.models.Students || mongoose.model("Students", studentsSchema)

export default Students
