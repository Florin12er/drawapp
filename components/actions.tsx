"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { ConfirmModal } from "./confirm-modal";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "./ui/dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { useRenameModal } from "@/store/use-rename-modal";

interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  alignOffset?: DropdownMenuContentProps["alignOffset"];
  id: string;
  title: string;
}

export const Actions = ({
  children,
  side,
  sideOffset,
  alignOffset,
  id,
  title,
}: ActionsProps) => {
  const { mutate, pending } = useApiMutation(api.board.remove);
  const { onOpen } = useRenameModal();

  const onDelete = () => {
    mutate({ id })
      .then(() => {
        toast.success("Board deleted");
      })
      .catch(() => {
        toast.error("Failed to delete board");
      });
  };

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => {
        toast.success("Link copied");
      })
      .catch(() => {
        toast.error("Failed to copy link");
      });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-60"
        alignOffset={alignOffset}
      >
        <DropdownMenuItem onClick={onCopyLink} className="cursor-pointer">
          <Link2 className="mr-2 h-4 w-4" />
          Copy board link
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onOpen(id, title)}
          className="cursor-pointer"
        >
          <Pencil className="mr-2 h-4 w-4" />
          Rename board
        </DropdownMenuItem>
        <ConfirmModal
          header="Delete board"
          description="Are you sure you want to delete this board?"
          disabled={pending}
          onConfirm={onDelete}
        >
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={(e) => e.preventDefault()}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete board
          </DropdownMenuItem>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
