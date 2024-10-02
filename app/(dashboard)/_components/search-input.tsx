"use client";

import { Input } from "@/components/ui/input";
import qs from "query-string";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect } from "react";
import { useDebounceValue } from "usehooks-ts";

export const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useDebounceValue("", 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "f" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        const input = document.querySelector("input");
        input?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: {
          search: value,
        },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      },
    );

    router.push(url);
  }, [value, router]);
  return (
    <>
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          className="rounded-md border border-zinc-300 w-full pl-10 focus:border-2 focus:border-black dark:focus:border-white"
          placeholder="Search boards"
          onChange={handleChange}
        />
      </div>
    </>
  );
};
