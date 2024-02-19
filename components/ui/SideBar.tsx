"use client";

import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";
const poppins = Montserrat({ weight: "600", subsets: ["latin"] });
const SideBar = () => {
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-0 mr-4">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <div className="">
            <h1>All Known</h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;