import mongoose, {Schema} from "mongoose"

const categorySchema = new Schema(
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
)

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema)

export default Category
