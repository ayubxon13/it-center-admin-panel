import mongoose, {ConnectOptions} from "mongoose"

const connectMongoDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    )
    console.log("MongoDB connected")
  } catch (err) {
    console.error((err as Error).message)
    process.exit(1)
  }
}

export default connectMongoDB
