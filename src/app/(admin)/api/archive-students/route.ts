import connectMongoDB from "@/database/mongodb";
import ArchiveStudents from "@/models/archive-students";
import {generateRandomNumber} from "@/utils/utils";
import {NextResponse} from "next/server";

export const GET = async () => {
  try {
    await connectMongoDB();
    const archiveStudents = await ArchiveStudents.find();
    return NextResponse.json(archiveStudents);
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
  const {fullName, birthday, address, group, personalPhone}: IArchiveStudents =
    await req.json();
  try {
    await connectMongoDB();
    await ArchiveStudents.create({
      id: generateRandomNumber(),
      fullName,
      birthday,
      address,
      group,
      personalPhone,
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
