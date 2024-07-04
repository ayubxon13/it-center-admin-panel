import connectMongoDB from "@/database/mongodb"
import Questions from "@/models/questions"
import {generateRandomNumber} from "@/utils/utils"
import {NextResponse} from "next/server"

export const GET = async () => {
  try {
    await connectMongoDB()
    const questions = await Questions.find()
    return NextResponse.json(questions)
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
  const {question, language, level, a, b, c, d, right}: IQuestions =
    await req.json()
  try {
    await connectMongoDB()
    await Questions.create({
      id: generateRandomNumber(),
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
