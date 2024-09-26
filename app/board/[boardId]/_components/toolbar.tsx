export const Toolbar = () => {
  return (
    <div className="absolute top-[-150%] -translate-y-[-150%] left-2 flex flex-col gap-y-4">
      <div className="bg-white dark:bg-neutral-700 rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
        <div>Pencil</div>
        <div>Eraser</div>
        <div>Rectangle</div>
        <div>Circle</div>
        <div>Line</div>
      </div>
      <div className="bg-white dark:bg-neutral-700 rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
        <div>Undo</div>
        <div>Redo</div>
      </div>
    </div>
  );
};
