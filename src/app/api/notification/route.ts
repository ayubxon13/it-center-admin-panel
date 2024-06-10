import connectMongoDB from "@/database/mongodb"
import Notification from "@/models/notification"
import {generateRandomNumber} from "@/utils/utils"
import {NextResponse} from "next/server"

export const GET = async () => {
  try {
    await connectMongoDB()
    const notification = await Notification.find()
    return NextResponse.json(notification)
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
  const {id, title, comment, image}: TNotification = await req.json()
  try {
    await connectMongoDB()
    await Notification.create({
      id: generateRandomNumber(),
      title,
      comment,
      image,
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
