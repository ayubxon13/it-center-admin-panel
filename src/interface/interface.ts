type ISelectGroup =
  | "Java"
  | "Python"
  | "Kotlin"
  | "C++"
  | "Scratch"
  | "Literacy"
  | "Android"
  | "JavaScript"
  | "Frontend";

interface IStudents {
  _id: string;
  id: number;
  fullName: string;
  birthday: string;
  address: string;
  group: string;
  personalPhone: string;
  homePhone: string;
  certificate: boolean | string;
  graduated: boolean | string;
  userPhoto: string | null;
  userPercentage: number;
  quizLevel: number;
  videoLevel: number;
  createdAt?: Date;
  updatedAt?: Date;
}
interface IRegisterStudents {
  _id: string;
  id: number;
  fullName: string;
  personalPhone: string;
  role: "noStudent";
  createdAt?: Date;
  updatedAt?: Date;
}

interface IArchiveStudents {
  _id: string;
  id: number;
  fullName: string;
  birthday: string;
  address: string;
  group: string;
  personalPhone: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type TNotification = {
  _id: string;
  id: number;
  title: string;
  comment: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
};

interface ICategory {
  _id: string;
  id: number;
  image: string;
  language: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ICourses {
  _id: string;
  id: string;
  image: string;
  levelImage: string;
  language: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IAds {
  _id: string;
  id: number;
  image: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}
type Level = "free" | "begin" | "medium" | "advanced";

interface ILessons {
  _id: string;
  id: number;
  lessonName: string;
  languageName: string;
  videoLink: string;
  level: Level;
  homework: string;
}

interface IQuestions {
  _id: string;
  id: number;
  question: string;
  language: string;
  level: string;
  a: string;
  b: string;
  c: string;
  d: string;
  right: "a" | "b" | "c" | "d";
  createdAt?: Date;
  updatedAt?: Date;
}

interface ITeacher {
  id: number;
  fullName: string;
  personalPhone: string;
  group: string;
}
