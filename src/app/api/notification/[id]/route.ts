import connectMongoDB from "@/database/mongodb"
import Notification from "@/models/notification"
import {NextResponse} from "next/server"

export const GET = async (req: Request, {params}: {params: {id: string}}) => {
  try {
    await connectMongoDB()
    const notification = await Notification.findOne({_id: params.id})
    return NextResponse.json(notification, {status: 200})
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
    const id = req.url.split("notification/")[1]
    await connectMongoDB()
    await Notification.findByIdAndDelete(id)
    return NextResponse.json({message: "OK"}, {status: 200})
  } catch (error) {
    return NextResponse.json({message: "ERROR", error}, {status: 500})
  }
}

export const PUT = async (req: Request, {params}: {params: {id: number}}) => {
  const {id} = params
  const {title, comment, image}: TNotification = await req.json()
  await connectMongoDB()
  await Notification.findByIdAndUpdate(id, {
    title,
    comment,
    image,
  })
  return NextResponse.json({message: "OK"}, {status: 200})
}
