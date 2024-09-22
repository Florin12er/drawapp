import Image from "next/image";

export const EmptySearch = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Image
        src="empty-search.svg"
        alt="empty search"
        width={200}
        height={200}
      />
      <h2 className="text-2xl font-semibold mt-6">No results found</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Try searching for something else
      </p>
    </div>
  );
};
