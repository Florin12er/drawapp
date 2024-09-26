"use client";

import { Hint } from "@/components/hint";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRenameModal } from "@/store/use-rename-modal";
import { ImageDown, Menu } from "lucide-react";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { Actions } from "@/components/actions";
import { ModeToggle } from "@/components/mode-toggle";

interface InfoProps {
  boardId: string;
  exportAsPng: () => void;
}

const TabSeparator = () => {
  return <div className="text-neutral-300 px-1.5 pointer-events-none">|</div>;
};

export const Info = ({ boardId, exportAsPng }: InfoProps) => {
  const { theme } = useTheme();
  const { onOpen } = useRenameModal();
  const data = useQuery(api.board.get, { id: boardId as Id<"boards"> });

  return (
    <div className="absolute top-2 left-2 bg-white dark:bg-neutral-700 rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Hint label="Go to boards" side="bottom" sideOffset={10}>
        <Button asChild className="px-2" variant="board">
          <Link href="/">
            <Image src="/logo.svg" alt="Board Logo" height={40} width={40} />
            <span className="font-semibold text-xl ml-2 text-black dark:text-white">
              Board
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Edit title" side="bottom" sideOffset={10}>
        <Button
          variant={theme === "dark" ? "boardDark" : "board"}
          className="text-base font-normal px-2 italic"
          onClick={() =>
            onOpen(data?._id as Id<"boards">, data?.title as string)
          }
        >
          {data?.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Export as PNG" side="bottom" sideOffset={10}>
        <Button
          size="icon"
          variant={theme === "dark" ? "boardDark" : "board"}
          onClick={exportAsPng}
        >
          <ImageDown />
        </Button>
      </Hint>
      <TabSeparator />
      <Actions
        id={data?._id as Id<"boards">}
        title={data?.title as string}
        side="bottom"
        sideOffset={10}
        alignOffset={-7}
      >
        <div>
          <Hint label="Main Menu" side="bottom" sideOffset={10}>
            <Button
              size="icon"
              variant={theme === "dark" ? "boardDark" : "board"}
            >
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
      <TabSeparator />
      <Hint label="Toggle Theme" side="bottom" sideOffset={10}>
        <div>
          <ModeToggle
            variant={theme === "dark" ? "boardDark" : "board"}
            align="start"
          />
        </div>
      </Hint>
    </div>
  );
};
