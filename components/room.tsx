"use client";

import { ReactNode } from "react";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Layer } from "@/types/canvas";
import { RoomProvider } from "@/liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";

interface RoomProps {
  children: ReactNode;
  roomId: string;
  fallback?: NonNullable<ReactNode> | null;
}

export function Room({ children, roomId, fallback }: RoomProps) {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
        selection: [],
        pencilDraft: null,
        penColor: null,
      }}
      initialStorage={{
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layersIds: new LiveList([]),
      }}
    >
      <ClientSideSuspense fallback={fallback ?? null}>
        {() => {
          return children;
        }}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
