import connectMongoDB from "@/database/mongodb"
import Students from "@/models/students"
import {generateRandomNumber} from "@/utils/utils"
import {NextResponse} from "next/server"

export const GET = async () => {
  try {
    await connectMongoDB()
    const students = await Students.find()
    return NextResponse.json(students)
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
  const {
    fullName,
    birthday,
    address,
    group,
    personalPhone,
    homePhone,
    certificate,
    graduated,
    userPercentage,
    userPhoto,
    quizLevel,
    videoLevel,
    groupName,
  }: IStudents = await req.json()
  try {
    await connectMongoDB()
    await Students.create({
      id: generateRandomNumber(),
      fullName,
      birthday,
      address,
      group,
      personalPhone,
      homePhone,
      certificate,
      graduated,
      userPercentage,
      userPhoto,
      quizLevel,
      videoLevel,
      groupName,
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
