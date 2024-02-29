"use client";

import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { FreeCounter } from "@/components/free-counter";
const poppins = Montserrat({ weight: "600", subsets: ["latin"] });
const routes = [
  {
    label: "Dashboard",
    icons: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversion",
    icons: MessageSquare,
    href: "/conversion",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icons: ImageIcon,
    href: "/image",
    color: "text-pink-700",
  },
  {
    label: "Video Generation",
    icons: VideoIcon,
    href: "/video",
    color: "text-orange-700",
  },
  {
    label: "Music Generation",
    icons: Music,
    href: "/music",
    color: "text-emerald-500",
  },
  {
    label: "Code Generation ",
    icons: Code,
    href: "/code",
    color: "text-green-700",
  },
  {
    label: "Settings",
    icons: Settings,
    href: "/setting",
  },
];
const SideBar = ({
  apiLimitCount = 0,
  isPro = false,
}: {
  apiLimitCount: number;
  isPro: boolean;
}) => {
  const pathname = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-auto mr-4">
            <Image
              alt="Logo"
              src="/logo.png"
              sizes="500px"
              width="50"
              height="50"
              style={{
                objectFit: "contain",
              }}
            />
          </div>
          <div className={cn("text-2xl font-bold", poppins.className)}>
            <h1>All Known</h1>
          </div>
        </Link>
        <div className="space-y-1">
          {routes.map((routes) => (
            <Link
              href={routes.href}
              key={routes.href}
              className={cn(
                "text-sm group flex p-3 justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg",
                pathname === routes.href
                  ? "text-white bg-white/10 rounded-lg"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <routes.icons className={cn("h-5 2-5 mr-3", routes.color)} />
                {routes.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro} />
    </div>
  );
};

export default SideBar;
