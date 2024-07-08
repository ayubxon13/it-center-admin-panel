import mongoose, {Schema} from "mongoose"

const archiveStudentsSchema = new Schema(
  {
    id: Number,
    fullName: String,
    birthday: String,
    address: String,
    group: String,
    personalPhone: String,
    homePhone: String,
    userPhoto: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const ArchiveStudents =
  mongoose.models.Students || mongoose.model("ArchiveStudents", archiveStudentsSchema)

export default ArchiveStudents
