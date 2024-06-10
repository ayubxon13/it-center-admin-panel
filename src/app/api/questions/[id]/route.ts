import connectMongoDB from "@/database/mongodb"
import Questions from "@/models/questions"
import {NextResponse} from "next/server"

export const GET = async (req: Request, {params}: {params: {id: string}}) => {
  try {
    await connectMongoDB()
    const lesson = await Questions.findOne({_id: params.id})
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
    const id = req.url.split("questions/")[1]
    await connectMongoDB()
    await Questions.findByIdAndDelete(id)
    return NextResponse.json({message: "OK"}, {status: 200})
  } catch (error) {
    return NextResponse.json({message: "ERROR", error}, {status: 500})
  }
}

export const PUT = async (req: Request, {params}: {params: {id: number}}) => {
  const {id} = params
  const {question, language, level, a, b, c, d, right}: IQuestions =
    await req.json()
  await connectMongoDB()
  await Questions.findByIdAndUpdate(id, {
    question,
    language,
    level,
    a,
    b,
    c,
    d,
    right,
  })
  return NextResponse.json({message: "OK"}, {status: 200})
}
