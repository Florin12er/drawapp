"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Input } from "@/components/ui/input";
import { UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";

export const Navbar = () => {
  return (
    <div className="flex items-center gap-x-4 p-5 border-b border-zinc-300">
      <div className="hidden lg:flex lg:flex-1 relative">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            className="rounded-md border border-zinc-300 w-full pl-10 focus:border-2 focus:border-black dark:focus:border-white"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <UserButton />
      </div>
      <ModeToggle />
    </div>
  );
};
