import axios from "axios";
const baseURL = "https://it-center-admin-panel.vercel.app/api/";
export const customFetch = axios.create({
  baseURL: baseURL,
});

export function generateRandomNumber(): number {
  let result = "";
  for (let i = 0; i < 5; i++) {
    const randomDigit = Math.floor(Math.random() * 10);
    result += randomDigit.toString();
  }
  return parseInt(result, 10);
}

export const formatPhoneNumber = (value: string) => {
  // Raqamlardan boshqa hamma narsani olib tashlaymiz
  const cleaned = ("" + value).replace(/\D/g, "");

  // Kirilgan raqamlar soni bo'yicha probellar qo'shamiz
  if (cleaned.length <= 2) {
    return cleaned;
  }
  if (cleaned.length <= 5) {
    return `${cleaned.slice(0, 2)} ${cleaned.slice(2)}`;
  }
  if (cleaned.length <= 7) {
    return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`;
  }
  if (cleaned.length <= 9) {
    return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(
      5,
      7
    )} ${cleaned.slice(7)}`;
  }

  // Agar raqamlar soni 9 bo'lsa, formatni to'liq kiritamiz
  return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(
    5,
    7
  )} ${cleaned.slice(7, 9)}`;
};

export const onChangeSelect = (value: string) => {
  console.log(`selected ${value}`);
};

export const onSearchSelect = (value: string) => {
  console.log("search:", value);
};

export const filterOptionSelect = (
  input: string,
  option?: {label: string; value: string}
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

export const neighborhood = [
  {
    value: "Qiyali",
    label: "Qiyali",
  },
  {
    value: "Tumor",
    label: "Tumor",
  },
  {
    value: "Qum qiyali",
    label: "Qum qiyali",
  },
  {
    value: "Navbahor",
    label: "Navbahor",
  },
  {
    value: "Oqjar",
    label: "Oqjar",
  },
  {
    value: "Taptiqsaroy",
    label: "Taptiqsaroy",
  },
  {
    value: "Kapasaroy",
    label: "Kapasaroy",
  },
  {
    value: "Abdusamad",
    label: "Abdusamad",
  },
  {
    value: "Doimobod",
    label: "Doimobod",
  },
  {
    value: "Bog'ish",
    label: "Bog'ish",
  },
  {
    value: "Katta turk",
    label: "Katta turk",
  },
  {
    value: "Kichik turk",
    label: "Kichik turk",
  },
  {
    value: "Chinobod",
    label: "Chinobod",
  },
  {
    value: "Oltiqush",
    label: "Oltiqush",
  },
  {
    value: "Qora ko'rpa",
    label: "Qora ko'rpa",
  },
  {
    value: "Teliming",
    label: "Teliming",
  },
  {
    value: "Sanam",
    label: "Sanam",
  },
  {
    value: "Mang'it",
    label: "Mang'it",
  },
  {
    value: "Soyshildir",
    label: "Soyshildir",
  },
  {
    value: "Oqtepa",
    label: "Oqtepa",
  },
  {
    value: "Shopo'lat",
    label: "Shopo'lat",
  },
  {
    value: "G'umoyli",
    label: "G'umoyli",
  },
  {
    value: "Naymancha",
    label: "Naymancha",
  },
  {
    value: "Tangriqul",
    label: "Tangriqul",
  },
  {
    value: "Katta minglar",
    label: "Katta minglar",
  },
  {
    value: "Katta aravon",
    label: "Katta aravon",
  },
  {
    value: "Qashqar",
    label: "Qashqar",
  },
  {
    value: "Targ'ova",
    label: "Targ'ova",
  },
  {
    value: "Rahmatillo",
    label: "Rahmatillo",
  },
  {
    value: "Boybo'ta",
    label: "Boybo'ta",
  },
  {
    value: "Shodlik",
    label: "Shodlik",
  },
  {
    value: "Arziktepa",
    label: "Arziktepa",
  },
  {
    value: "Yangi zamon",
    label: "Yangi zamon",
  },
  {
    value: "Katta amirobod",
    label: "Katta amirobod",
  },
  {
    value: "Qizilmusht",
    label: "Qizilmusht",
  },
  {
    value: "Uvaysiy",
    label: "Uvaysiy",
  },
  {
    value: "Istiqlol",
    label: "Istiqlol",
  },
  {
    value: "Taypoq",
    label: "Taypoq",
  },
  {
    value: "Uymovut",
    label: "Uymovut",
  },
  {
    value: "Katta boybo'cha",
    label: "Katta boybo'cha",
  },
  {
    value: "Qiyali Qo'rg'oncha",
    label: "Qiyali Qo'rg'oncha",
  },
  {
    value: "Yashik",
    label: "Yashik",
  },
  {
    value: "Bo'riqum",
    label: "Bo'riqum",
  },
  {
    value: "Qoramulla",
    label: "Qoramulla",
  },
  {
    value: "Urganchi",
    label: "Urganchi",
  },
  {
    value: "Pishqaron",
    label: "Pishqaron",
  },
];

export const teacherData: ITeacher[] = [
  {
    id: generateRandomNumber(),
    fullName: "Ahmadjon Hazratqulov",
    personalPhone: "+998 91 327 32 31",
    group: "Python",
  },
  {
    id: generateRandomNumber(),
    fullName: "Asilbek Komilov",
    personalPhone: "+998 90 293 39 96",
    group: "Android",
  },
  {
    id: generateRandomNumber(),
    fullName: "Javohirbek Muxtorov",
    personalPhone: "+998 90 570 06 54",
    group: "Java, Kotlin",
  },
];
