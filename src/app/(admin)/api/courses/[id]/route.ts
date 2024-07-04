import connectMongoDB from "@/database/mongodb";
import Courses from "@/models/courses";
import {NextResponse} from "next/server";

export const GET = async (req: Request, {params}: {params: {id: string}}) => {
  try {
    await connectMongoDB();
    const category = await Courses.findOne({_id: params.id});
    return NextResponse.json(category, {status: 200});
  } catch (error) {
    return NextResponse.json(
      {message: "ERROR", error},
      {
        status: 500,
      }
    );
  }
};
export const DELETE = async (req: Request) => {
  try {
    const id = req.url.split("courses/")[1];
    await connectMongoDB();
    await Courses.findByIdAndDelete(id);
    return NextResponse.json({message: "OK"}, {status: 200});
  } catch (error) {
    return NextResponse.json({message: "ERROR", error}, {status: 500});
  }
};
export const PUT = async (req: Request, {params}: {params: {id: number}}) => {
  const {id} = params;
  const {image, levelImage, language}: ICourses = await req.json();
  await connectMongoDB();
  await Courses.findByIdAndUpdate(id, {
    image,
    levelImage,
    language,
  });
  return NextResponse.json({message: "OK"}, {status: 200});
};
