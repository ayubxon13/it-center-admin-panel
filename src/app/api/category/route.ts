import connectMongoDB from "@/database/mongodb"
import Category from "@/models/category"
import {generateRandomNumber} from "@/utils/utils"
import {NextResponse} from "next/server"

export const GET = async () => {
  try {
    await connectMongoDB()
    const category = await Category.find()
    return NextResponse.json(category)
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
  const {image, levelImage, language}: ICategory = await req.json()
  try {
    await connectMongoDB()
    await Category.create({
      id: generateRandomNumber(),
      image,
      levelImage,
      language,
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
