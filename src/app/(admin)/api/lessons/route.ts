import connectMongoDB from "@/database/mongodb"
import Lessons from "@/models/lessons"
import {generateRandomNumber} from "@/utils/utils"
import {NextResponse} from "next/server"

export const GET = async () => {
  try {
    await connectMongoDB()
    const lessons = await Lessons.find()
    return NextResponse.json(lessons)
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
  const {lessonName, languageName, videoLink, level, homework}: ILessons =
    await req.json()
  try {
    await connectMongoDB()
    await Lessons.create({
      id: generateRandomNumber(),
      lessonName,
      languageName,
      videoLink,
      level,
      homework,
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
