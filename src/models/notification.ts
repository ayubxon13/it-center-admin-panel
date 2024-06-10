import mongoose, {Schema} from "mongoose"

const notificationSchema = new Schema(
  {
    id: Number,
    title: String,
    comment: String,
    image: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema)
export default Notification
