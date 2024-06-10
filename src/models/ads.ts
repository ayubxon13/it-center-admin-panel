import mongoose, {Schema} from "mongoose"

const adsSchema = new Schema(
  {
    id: Number,
    image: String,
    title: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const Ads = mongoose.models.Ads || mongoose.model("Ads", adsSchema)

export default Ads
