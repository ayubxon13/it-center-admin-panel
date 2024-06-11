import connectMongoDB from "@/database/mongodb"
import RegisterStudents from "@/models/register-students"
import {generateRandomNumber} from "@/utils/utils"
import {NextResponse} from "next/server"

export const GET = async () => {
  try {
    await connectMongoDB()
    const registerStudents = await RegisterStudents.find()
    return NextResponse.json(registerStudents)
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
  const {fullName, number}: IRegierterStudents = await req.json()
  try {
    await connectMongoDB()
    await RegisterStudents.create({
      id: generateRandomNumber(),
      fullName,
      number,
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
