import connectMongoDB from "@/database/mongodb"
import Category from "@/models/category"
import {NextResponse} from "next/server"

export const GET = async (req: Request, {params}: {params: {id: string}}) => {
  try {
    await connectMongoDB()
    const category = await Category.findOne({_id: params.id})
    return NextResponse.json(category, {status: 200})
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
    const id = req.url.split("category/")[1]
    await connectMongoDB()
    await Category.findByIdAndDelete(id)
    return NextResponse.json({message: "OK"}, {status: 200})
  } catch (error) {
    return NextResponse.json({message: "ERROR", error}, {status: 500})
  }
}
export const PUT = async (req: Request, {params}: {params: {id: number}}) => {
  const {id} = params
  const {image, levelImage, language}: ICategory = await req.json()
  await connectMongoDB()
  await Category.findByIdAndUpdate(id, {
    image,
    levelImage,
    language,
  })
  return NextResponse.json({message: "OK"}, {status: 200})
}
