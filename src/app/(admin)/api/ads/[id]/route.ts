import connectMongoDB from "@/database/mongodb"
import Ads from "@/models/ads"
import {NextResponse} from "next/server"

export const GET = async (req: Request, {params}: {params: {id: string}}) => {
  try {
    await connectMongoDB()
    const ads = await Ads.findOne({_id: params.id})
    return NextResponse.json(ads, {status: 200})
  } catch (error) {
    return NextResponse.json(
      {message: "ERROR", error},
      {
        status: 500,
      }
    )
  }
}
export const DELETE = async (req: Request) => {
  try {
    const id = req.url.split("ads/")[1]
    await connectMongoDB()
    await Ads.findByIdAndDelete(id)
    return NextResponse.json({message: "OK"}, {status: 200})
  } catch (error) {
    return NextResponse.json({message: "ERROR", error}, {status: 500})
  }
}
export const PUT = async (req: Request, {params}: {params: {id: number}}) => {
  const {id} = params
  const {image, title}: IAds = await req.json()
  await connectMongoDB()
  await Ads.findByIdAndUpdate(id, {image, title})
  return NextResponse.json({message: "OK"}, {status: 200})
}
