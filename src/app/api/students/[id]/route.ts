import connectMongoDB from "@/database/mongodb"
import Students from "@/models/students"
import {NextResponse} from "next/server"

export const GET = async (req: Request, {params}: {params: {id: string}}) => {
  try {
    await connectMongoDB()
    const student = await Students.findOne({_id: params.id})
    return NextResponse.json(student, {status: 200})
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
    const id = req.url.split("students/")[1]
    await connectMongoDB()
    await Students.findByIdAndDelete(id)
    return NextResponse.json({message: "OK"}, {status: 200})
  } catch (error) {
    return NextResponse.json({message: "ERROR", error}, {status: 500})
  }
}
export const PUT = async (req: Request, {params}: {params: {id: number}}) => {
  const {id} = params
  const {
    address,
    birthday,
    fullName,
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
  await connectMongoDB()
  await Students.findByIdAndUpdate(id, {
    address,
    birthday,
    fullName,
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
}
