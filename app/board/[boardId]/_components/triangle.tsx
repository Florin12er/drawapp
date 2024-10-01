import { colorToCss } from "@/lib/utils";
import { TriangleLayer } from "@/types/canvas";

interface TriangleProps {
  id: string;
  layer: TriangleLayer;
  onPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string | null;
}

export const Triangle = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: TriangleProps) => {
  const { x, y, width, height, fill } = layer;

  const points = `
    ${width / 2},0
    ${width},${height}
    0,${height}
  `;

  return (
    <polygon
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      points={points}
      fill={fill ? colorToCss(fill) : "#CCC"}
      stroke={selectionColor || "transparent"}
      strokeWidth={1}
    />
  );
};
