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

type TInputs = {
  fullName: string;
  birthday: string;
  address: string;
  group: string;
  personalPhone: string;
  homePhone: string;
  certificate: string;
  graduated: string;
};

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
  createdAt?: Date;
  updatedAt?: Date;
  quizLevel: number;
  videoLevel: number;
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
  id: number;
  question: string;
  language: ISelectGroup;
  level: string;
  a: string;
  b: string;
  c: string;
  d: string;
  right: string;
}

interface ITeacher {
  id: number;
  fullName: string;
  personalPhone: string;
  group: string;
}
