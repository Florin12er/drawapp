import { colorToCss } from "@/lib/utils";
import { RhombusLayer } from "@/types/canvas";

interface RhombusProps {
  id: string;
  layer: RhombusLayer;
  onPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string | null;
}

export const Rhombus = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: RhombusProps) => {
  const { x, y, width, height, fill } = layer;

  // Calculate the points for a rhombus
  const points = `
    ${width / 2},0
    ${width},${height / 2}
    ${width / 2},${height}
    0,${height / 2}
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
