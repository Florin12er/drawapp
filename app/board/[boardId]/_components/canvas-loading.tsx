"use client";

import { Loader } from "lucide-react";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";

export function CanvasLoading() {
  return (
    <main className="w-full h-full absolute bg-white dark:bg-zinc-800 touch-none flex items-center justify-center">
      <Loader className="w-6 h-6 text-muted-foreground animate-spin" />
      <Info.Skeleton />
      <Participants.Skeleton />
      <Toolbar.Skeleton />
    </main>
  );
}
