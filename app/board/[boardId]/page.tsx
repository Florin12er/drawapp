import { Canvas } from "./_components/canvas";
import { Room } from "@/components/room";
import { CanvasLoading } from "./_components/canvas-loading";

interface BoardPageProps {
  params: {
    boardId: string;
  };
}

const BoardPage = ({ params }: BoardPageProps) => {
  return (
    <>
      <Room roomId={params.boardId as string} fallback={<CanvasLoading />}>
        <Canvas boardId={params.boardId as string} />
      </Room>
    </>
  );
};

export default BoardPage;
