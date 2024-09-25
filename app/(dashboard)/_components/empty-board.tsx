"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const EmptyBoard = () => {
  const router = useRouter();
  const { mutate, pending } = useApiMutation(api.board.create);
  const { organization } = useOrganization();

  const createBoard = async () => {
    if (!organization) {
      return;
    }

    await mutate({
      orgId: organization?.id,
      title: "My Board",
    })
      .then((id) => {
        toast.success("Board created");
        router.push(`/board/${id}`);
      })
      .catch(() => {
        toast.error("Failed to create board");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Image src="note.svg" alt="empty organization" width={200} height={200} />
      <div className="text-2xl font-bold">Welcome to Board</div>
      <p className="text-gray-500">Create an organization to get started</p>
      <div className="mt-6">
        <Button
          disabled={pending}
          className="p-6 font-bold"
          onClick={createBoard}
        >
          Create Board
        </Button>
      </div>
    </div>
  );
};
