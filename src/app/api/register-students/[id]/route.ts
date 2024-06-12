import connectMongoDB from "@/database/mongodb"
import RegisterStudents from "@/models/register-students"
import { NextResponse } from "next/server"

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    await connectMongoDB()
    const registerStudents = await RegisterStudents.findOne({ _id: params.id })
    return NextResponse.json(registerStudents, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "ERROR", error },
      {
        status: 500,
      }
    )
  }
}
export const DELETE = async (req: Request) => {
  try {
    const id = req.url.split("register-students/")[1]
    await connectMongoDB()
    await RegisterStudents.findByIdAndDelete(id)
    return NextResponse.json({ message: "OK" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "ERROR", error }, { status: 500 })
  }
}
export const PUT = async (req: Request, { params }: { params: { id: number } }) => {
  const { id } = params
  const { fullName, personalPhone }: IRegisterStudents = await req.json()
  await connectMongoDB()
  await RegisterStudents.findByIdAndUpdate(id, {
    fullName,
    personalPhone,
  })
  return NextResponse.json({ message: "OK" }, { status: 200 })
}
