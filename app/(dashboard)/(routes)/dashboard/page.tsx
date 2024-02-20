"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import {
  ArrowRight,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Conversion",
    icons: MessageSquare,
    href: "/conversion",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Image Generation",
    icons: ImageIcon,
    href: "/image",
    color: "text-pink-700",
    bgColor: "text-pink-700/10",
  },
  {
    label: "Video Generation",
    icons: VideoIcon,
    href: "/video",
    color: "text-orange-700",
    bgcolor: "text-orange-700/10",
  },
  {
    label: "Music Generation",
    icons: Music,
    href: "/music",
    color: "text-emerald-500",
    bgcolor: "text-emerald-500/10",
  },
  {
    label: "Code Generation ",
    icons: Code,
    href: "/code",
    color: "text-green-700",
    bgcolor: "text-green-700/10",
  },
];

const DashboardPage = () => {
  const router = useRouter();

  return (
    <div className="">
      <div className="mb-8 space-y-2">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Explore the Power of AI
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with the smartest AI - Experience the power of AI
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icons className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRight className="h-5 w-5" />
          </Card>
        ))}
        <div className=""></div>
      </div>
    </div>
  );
};

export default DashboardPage;
