"use client"
import {Disclosure} from "@headlessui/react"
import {
  Bars3Icon,
  ChartBarSquareIcon,
  Cog6ToothIcon,
  EllipsisHorizontalIcon,
  ExclamationCircleIcon,
  FolderPlusIcon,
  PhotoIcon,
  PlayIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline"

import Link from "next/link"
import {useRouter} from "next/navigation"

function SideNavbar() {
  const route = useRouter()
  const sideBarLinks = [
    {
      id: 1,
      name: "O'quvchilar",
      link: "/",
      chilren: (
        <UserGroupIcon
          className="text-2xl text-[#DBE2EF] group-hover:text-white"
          width={24}
          height={24}
        />
      ),
    },
    {
      id: 2,
      name: "Kurslar",
      link: "/courses",
      chilren: (
        <FolderPlusIcon
          className="text-2xl text-[#DBE2EF] group-hover:text-white"
          width={24}
          height={24}
        />
      ),
    },
    {
      id: 3,
      name: "Darslar",
      link: "/lessons",
      chilren: (
        <PlayIcon
          className="text-2xl text-[#DBE2EF] group-hover:text-white"
          width={24}
          height={24}
        />
      ),
    },
    {
      id: 4,
      name: "Reklama",
      link: "/ads",
      chilren: (
        <PhotoIcon
          className="text-2xl text-[#DBE2EF] group-hover:text-white"
          width={24}
          height={24}
        />
      ),
    },
    {
      id: 5,
      name: "Hiosob",
      link: "/profile",
      chilren: (
        <UserCircleIcon
          className="text-2xl text-[#DBE2EF] group-hover:text-white"
          width={24}
          height={24}
        />
      ),
    },
    {
      id: 7,
      name: "Analytics",
      link: "/analytics",
      chilren: (
        <ChartBarSquareIcon
          className="text-2xl text-[#DBE2EF] group-hover:text-white"
          width={24}
          height={24}
        />
      ),
    },
  ]
  return (
    <div>
      <Disclosure className="select-none" as="nav">
        <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-[#DBE2EF] hover:bg-[#3F72AF] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <Bars3Icon className="block md:hidden h-6 w-6" aria-hidden="true" />
        </Disclosure.Button>
        <div className="p-6 w-1/2 h-screen bg-[#112D4E] z-20 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start item-center">
            <Link
              href="/"
              className="text-base text-center cursor-pointer font-bold text-[#DBE2EF] border-b border-gray-100 pb-4 w-full"
            >
              IT-CENTER-ADMIN-PANEL
            </Link>
            <div className=" my-4 border-b border-gray-100 pb-4">
              {sideBarLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.link}
                  className="flex transition-all mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#3F72AF] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
                >
                  {link.chilren}
                  <h3 className="text-base text-[#DBE2EF] group-hover:text-white font-semibold ">
                    {link.name}
                  </h3>
                </Link>
              ))}
            </div>
            {/* setting  */}
            <div className=" my-4 border-b border-gray-100 pb-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#3F72AF] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <Cog6ToothIcon
                  width={24}
                  height={24}
                  className="text-2xl text-[#DBE2EF] group-hover:text-white "
                />
                <h3 className="text-base text-[#DBE2EF] group-hover:text-white font-semibold ">
                  Sozlamalar
                </h3>
              </div>
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#3F72AF] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <EllipsisHorizontalIcon
                  width={24}
                  height={24}
                  className="text-2xl text-[#DBE2EF] group-hover:text-white "
                />
                <h3 className="text-base text-[#DBE2EF] group-hover:text-white font-semibold ">
                  Yana
                </h3>
              </div>
            </div>
            {/* logout */}
            <button
              onClick={() => {
                localStorage.removeItem("auth")
                route.push("/login")
              }}
              className="my-4"
            >
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-[#3F72AF] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <ExclamationCircleIcon
                  width={24}
                  height={24}
                  className="text-2xl text-[#DBE2EF] group-hover:text-white "
                />
                <h3 className="text-base text-[#DBE2EF] group-hover:text-white font-semibold ">
                  Chiqish
                </h3>
              </div>
            </button>
          </div>
        </div>
      </Disclosure>
    </div>
  )
}

export default SideNavbar
