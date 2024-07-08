import connectMongoDB from "@/database/mongodb";
import ArchiveStudents from "@/models/archiveStudents";
import {NextResponse} from "next/server";

export const GET = async (req: Request, {params}: {params: {id: string}}) => {
  try {
    await connectMongoDB();
    const archiveStudent = await ArchiveStudents.findOne({_id: params.id});
    return NextResponse.json(archiveStudent, {status: 200});
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
    const id = req.url.split("archive-students/")[1];
    await connectMongoDB();
    await ArchiveStudents.findByIdAndDelete(id);
    return NextResponse.json({message: "OK"}, {status: 200});
  } catch (error) {
    return NextResponse.json({message: "ERROR", error}, {status: 500});
  }
};
export const PUT = async (req: Request, {params}: {params: {id: number}}) => {
  const {id} = params;
  const {
    address,
    birthday,
    fullName,
    group,
    personalPhone,
    homePhone,
    userPhoto,
  }: IArchiveStudents = await req.json();
  await connectMongoDB();
  await ArchiveStudents.findByIdAndUpdate(id, {
    address,
    birthday,
    fullName,
    group,
    personalPhone,
    homePhone,
    userPhoto,
  });
  return NextResponse.json({message: "OK"}, {status: 200});
};
