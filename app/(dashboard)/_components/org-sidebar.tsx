"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Star } from "lucide-react";
import { useTheme } from "next-themes";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const OrgSidebar = () => {
  const { theme } = useTheme();

  return (
    <div className="hidden lg:flex flex-col space-y-6 w-[210px] p-5 border-r border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900">
      <Link href="/" className="flex items-center gap-x-2 p-2 rounded-lg">
        <Image src="/logo.svg" alt="logo" width={40} height={40} />
        <span
          className={cn(
            "font-bold text-2xl text-gray-800 dark:text-white",
            font.className,
          )}
        >
          drawapp
        </span>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              backgroundColor: theme === "dark" ? "#1F2937" : "#E5E7EB",
            },
            organizationSwitcherTrigger: {
              padding: "6px",
              width: "100%",
              borderRadius: "8px",
              border:
                theme === "dark" ? "1px solid #374151" : "1px solid #E5E7EB",
              justifyContent: "space-between",
              color: theme === "dark" ? "#E5E7EB" : "#1F2937",
              "&:hover": {
                backgroundColor: theme === "dark" ? "#374151" : "#E5E7EB",
                color: theme === "dark" ? "#E5E7EB" : "#1F2937",
              },
            },
          },
        }}
      />
      <div className="space-y-1 w-full">
        <Button
          variant="transparent"
          asChild
          size="lg"
          className="font-normal justify-start px-2 w-full text-gray-700 dark:text-gray-300"
        >
          <Link href="/">
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Team boards
          </Link>
        </Button>
        <Button
          variant="transparent"
          asChild
          size="lg"
          className="font-normal justify-start px-2 w-full text-gray-700 dark:text-gray-300"
        >
          <Link
            href={{
              pathname: "/",
              query: { favorites: true },
            }}
          >
            <Star className="w-4 h-4 mr-2" />
            Favorite boards
          </Link>
        </Button>
      </div>
    </div>
  );
};
