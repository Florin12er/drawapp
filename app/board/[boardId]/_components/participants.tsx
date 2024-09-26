import { UserButton } from "@clerk/nextjs";

export const Participants = () => {
  return (
    <div className="absolute top-2 right-2 bg-white dark:bg-neutral-700 rounded-md px-1.5 h-12 flex items-center shadow-md">
      <UserButton />
    </div>
  );
};
