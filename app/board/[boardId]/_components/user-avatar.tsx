"use client";

import { Hint } from "@/components/hint";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserAvatarProps {
  src?: string;
  name?: string;
  fallback?: string;
  borderColor?: string;
}

export function UserAvatar({
  src,
  name,
  fallback,
  borderColor,
}: UserAvatarProps) {
  return (
    <Hint label={name || "Anonymous"} side="bottom" sideOffset={18}>
      <Avatar className="w-8 h-8 border-2" style={{ borderColor: borderColor }}>
        <AvatarImage src={src} />
        <AvatarFallback className="text-xs font-semibold">
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  );
}
