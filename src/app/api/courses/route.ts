import connectMongoDB from "@/database/mongodb";
import Courses from "@/models/courses";
import {generateRandomNumber} from "@/utils/utils";
import {NextResponse} from "next/server";

export const GET = async () => {
  try {
    await connectMongoDB();
    const courses = await Courses.find();
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error",
        error,
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = async (req: Request) => {
  const {image, levelImage, language}: ICourses = await req.json();
  try {
    await connectMongoDB();
    await Courses.create({
      id: generateRandomNumber(),
      image,
      levelImage,
      language,
    });
    return NextResponse.json({message: "OK"}, {status: 200});
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error",
        error,
      },
      {
        status: 500,
      }
    );
  }
};
