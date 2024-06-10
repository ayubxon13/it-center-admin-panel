import connectMongoDB from "@/database/mongodb"
import Lessons from "@/models/lessons"
import {NextResponse} from "next/server"

export const GET = async (req: Request, {params}: {params: {id: string}}) => {
  try {
    await connectMongoDB()
    const lesson = await Lessons.findOne({_id: params.id})
    return NextResponse.json(lesson, {status: 200})
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
    const id = req.url.split("lessons/")[1]
    await connectMongoDB()
    await Lessons.findByIdAndDelete(id)
    return NextResponse.json({message: "OK"}, {status: 200})
  } catch (error) {
    return NextResponse.json({message: "ERROR", error}, {status: 500})
  }
}

export const PUT = async (req: Request, {params}: {params: {id: number}}) => {
  const {id} = params
  const {lessonName, languageName, videoLink, level, homework}: ILessons =
    await req.json()
  await connectMongoDB()
  await Lessons.findByIdAndUpdate(id, {
    lessonName,
    languageName,
    videoLink,
    level,
    homework,
  })
  return NextResponse.json({message: "OK"}, {status: 200})
}
