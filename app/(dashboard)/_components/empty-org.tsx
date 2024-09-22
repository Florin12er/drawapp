import Image from "next/image";
import { CreateOrganization } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export const EmptyOrg = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Image
        src="elements.svg"
        alt="empty organization"
        width={400}
        height={400}
      />
      <div className="text-2xl font-bold">Welcome to Board</div>
      <p className="text-gray-500">Create an organization to get started</p>
      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4 p-6">Create Organization</Button>
          </DialogTrigger>
          <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
            <CreateOrganization routing="hash" />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
