import connectMongoDB from "@/database/mongodb"
import Ads from "@/models/ads"
import {generateRandomNumber} from "@/utils/utils"
import {NextResponse} from "next/server"

export const GET = async () => {
  try {
    await connectMongoDB()
    const ads = await Ads.find()
    return NextResponse.json(ads)
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error",
        error,
      },
      {
        status: 500,
      }
    )
  }
}
export const POST = async (req: Request) => {
  const {image, title}: IAds = await req.json()
  try {
    await connectMongoDB()
    await Ads.create({
      id: generateRandomNumber(),
      image,
      title,
    })
    return NextResponse.json({message: "OK"}, {status: 200})
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error",
        error,
      },
      {
        status: 500,
      }
    )
  }
}
