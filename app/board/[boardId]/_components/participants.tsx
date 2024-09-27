"use client";
import { connectionIdToColor } from "@/lib/utils";
import { UserAvatar } from "./user-avatar";
import { useOthers, useSelf } from "@/liveblocks.config";

const MAX_SHOWN_USERS = 3;

export const Participants = () => {
  const users = useOthers();
  const currentUser = useSelf();

  const hasMoreUsers = users.length > MAX_SHOWN_USERS;

  return (
    <div className="absolute top-2 right-2 bg-white dark:bg-neutral-700 rounded-md px-1.5 h-12 flex items-center shadow-md">
      <div className="flex gap-x-2">
        {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              borderColor={connectionIdToColor(connectionId)}
              key={connectionId}
              src={info?.picture}
              name={info?.name}
              fallback={info?.name?.[0] || "T"}
            />
          );
        })}

        {currentUser && (
          <UserAvatar
            borderColor={connectionIdToColor(currentUser.connectionId)}
            src={currentUser.info?.picture}
            name={`${currentUser.info?.name} (You)`}
            fallback={currentUser.info?.name?.[0] || "T"}
          />
        )}

        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - MAX_SHOWN_USERS} more`}
            fallback={`+ ${users.length - MAX_SHOWN_USERS}`}
          />
        )}
      </div>
    </div>
  );
};
Participants.Skeleton = function ParticipantsSkeleton() {
  return (
    <div className="absolute top-2 right-2 bg-gray-200 dark:bg-neutral-700 rounded-md px-1.5 h-12 flex items-center shadow-md w-[40px]" />
  );
};
